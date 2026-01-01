"use client";

// ShadCn
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Components
import { BaseButton, SendPdfToEmailModal, Subheading } from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Icons
import {
    BookmarkIcon,
    DownloadCloudIcon,
    Eye,
    Mail,
    MoveLeft,
    Printer,
} from "lucide-react";

export default function FinalPdf() {
    const {
        pdfUrl,
        removeFinalPdf,
        previewPdfInTab,
        downloadPdf,
        printPdf,
        saveInvoice,
        sendPdfToMail,
    } = useInvoiceContext();

    return (
        <>
            <Subheading>Final PDF:</Subheading>
            <div className="flex items-center mb-3">
                <BaseButton
                    variant={"ghost"}
                    size="sm"
                    onClick={removeFinalPdf}
                    className="text-xs sm:text-sm"
                >
                    <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Back to Live Preview</span>
                    <span className="sm:hidden">Back</span>
                </BaseButton>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 my-1 justify-center sm:justify-start">
                <BaseButton
                    tooltipLabel="Preview invoice in new tab"
                    onClick={previewPdfInTab}
                    size="sm"
                    variant={"outline"}
                    className="flex-1 sm:flex-none"
                >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Preview</span>
                </BaseButton>
                <BaseButton
                    tooltipLabel="Download invoice PDF"
                    onClick={downloadPdf}
                    size="sm"
                    variant={"outline"}
                    className="flex-1 sm:flex-none"
                >
                    <DownloadCloudIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Download</span>
                </BaseButton>

                <BaseButton
                    tooltipLabel="Print invoice"
                    onClick={printPdf}
                    size="sm"
                    variant={"outline"}
                    className="flex-1 sm:flex-none"
                >
                    <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Print</span>
                </BaseButton>

                <BaseButton
                    tooltipLabel="Save invoice in website"
                    onClick={saveInvoice}
                    size="sm"
                    variant={"outline"}
                    className="flex-1 sm:flex-none"
                >
                    <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Save</span>
                </BaseButton>

                <SendPdfToEmailModal sendPdfToMail={sendPdfToMail}>
                    <BaseButton
                        tooltipLabel="Send invoice PDF to mail"
                        size="sm"
                        variant={"outline"}
                        className="flex-1 sm:flex-none"
                    >
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Send to mail</span>
                    </BaseButton>
                </SendPdfToEmailModal>
            </div>
            <AspectRatio ratio={1 / 1.4}>
                <iframe
                    className="h-full w-full rounded-xl"
                    src={`${pdfUrl}#toolbar=0`}
                />
            </AspectRatio>
        </>
    );
}
