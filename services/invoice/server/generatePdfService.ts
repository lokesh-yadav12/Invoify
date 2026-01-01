import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Chromium
import chromium from "@sparticuz/chromium";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { ENV, TAILWIND_CDN } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

/**
 * Convert a local image path to base64 data URL
 * @param imagePath - The path to the image (e.g., "/assets/img/elite8digital.png")
 * @returns Base64 data URL or the original path if conversion fails
 */
function convertImageToBase64(imagePath: string): string {
    // If it's already a data URL, return as is
    if (imagePath.startsWith("data:")) {
        return imagePath;
    }

    // If it's a URL (http/https), return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    try {
        // Remove leading slash and construct the full path
        const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
        const fullPath = path.join(process.cwd(), "public", cleanPath);

        // Check if file exists
        if (fs.existsSync(fullPath)) {
            // Read the file
            const imageBuffer = fs.readFileSync(fullPath);
            
            // Determine MIME type based on file extension
            const ext = path.extname(fullPath).toLowerCase();
            let mimeType = "image/png";
            if (ext === ".jpg" || ext === ".jpeg") {
                mimeType = "image/jpeg";
            } else if (ext === ".svg") {
                mimeType = "image/svg+xml";
            } else if (ext === ".gif") {
                mimeType = "image/gif";
            }

            // Convert to base64
            const base64Image = imageBuffer.toString("base64");
            return `data:${mimeType};base64,${base64Image}`;
        }
    } catch (error) {
        console.error("Error converting image to base64:", error);
    }

    // Return original path if conversion fails
    return imagePath;
}

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
    const body: InvoiceType = await req.json();
    let browser;
    let page;

    try {
        console.log("Starting PDF generation...");
        
        // Convert logo to base64 if it's a local path
        if (body.details.invoiceLogo) {
            const originalLogo = body.details.invoiceLogo;
            try {
                body.details.invoiceLogo = convertImageToBase64(body.details.invoiceLogo);
                console.log("Logo conversion successful:", originalLogo);
            } catch (logoError) {
                console.error("Logo conversion failed:", logoError);
                // Continue with original logo path
            }
        }

        // Convert signature image to base64 if it's a local path
        if (body.details.signature?.data && !body.details.signature.data.startsWith("data:")) {
            try {
                body.details.signature.data = convertImageToBase64(body.details.signature.data);
            } catch (sigError) {
                console.error("Signature conversion failed:", sigError);
            }
        }

        console.log("Rendering HTML template...");
        const ReactDOMServer = (await import("react-dom/server")).default;
        const templateId = body.details.pdfTemplate;
        const InvoiceTemplate = await getInvoiceTemplate(templateId);
        
        if (!InvoiceTemplate) {
            throw new Error(`Template ${templateId} not found`);
        }
        
        const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
            InvoiceTemplate(body)
        );
        console.log("HTML template rendered successfully");

		if (ENV === "production") {
			console.log("Launching Puppeteer (production mode)...");
			const puppeteer = (await import("puppeteer-core")).default;
			browser = await puppeteer.launch({
				args: [...chromium.args, "--disable-dev-shm-usage", "--ignore-certificate-errors"],
				executablePath: await chromium.executablePath(),
				headless: true,
			});
		} else {
			console.log("Launching Puppeteer (development mode)...");
			const puppeteer = (await import("puppeteer")).default;
			browser = await puppeteer.launch({
				args: ["--no-sandbox", "--disable-setuid-sandbox"],
				headless: true,
			});
		}

        if (!browser) {
            throw new Error("Failed to launch browser");
        }

        console.log("Browser launched, creating page...");
        page = await browser.newPage();
        
        console.log("Setting page content...");
        await page.setContent(htmlTemplate, {
            waitUntil: ["load", "domcontentloaded"],
            timeout: 60000,
        });

        console.log("Adding Tailwind CSS...");
        await page.addStyleTag({
            url: TAILWIND_CDN,
        });

        // Wait for styles to be applied
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log("Generating PDF...");
		const pdf: Uint8Array = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
		});

        console.log("PDF generated successfully!");
		return new NextResponse(new Blob([pdf], { type: "application/pdf" }), {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": "attachment; filename=invoice.pdf",
				"Cache-Control": "no-cache",
				Pragma: "no-cache",
			},
			status: 200,
		});
	} catch (error: any) {
		console.error("PDF Generation Error:", error);
		console.error("Error stack:", error.stack);
		return new NextResponse(
			JSON.stringify({ 
				error: "Failed to generate PDF",
				message: error.message,
				stack: ENV === "development" ? error.stack : undefined
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} finally {
		if (page) {
			try {
				await page.close();
			} catch (e) {
				console.error("Error closing page:", e);
			}
		}
		if (browser) {
			try {
				const pages = await browser.pages();
				await Promise.all(pages.map((p) => p.close()));
				await browser.close();
			} catch (e) {
				console.error("Error closing browser:", e);
			}
		}
	}
}
