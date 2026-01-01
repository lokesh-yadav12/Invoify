"use client";

import Image from "next/image";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Components
import {
    BaseButton,
    InvoiceTemplate1,
    InvoiceTemplate2,
    InvoiceTemplate3,
    InvoiceTemplate4,
} from "@/app/components";

// Template images
import template1 from "@/public/assets/img/invoice-1-example.png";
import template2 from "@/public/assets/img/invoice-2-example.png";
// import template3 from "@/public/assets/img/invoice-3-example.png"; // TODO: Add preview image

// Icons
import { Check } from "lucide-react";

// Types
import { InvoiceType } from "@/types";

const TemplateSelector = () => {
    const { watch, setValue } = useFormContext<InvoiceType>();
    const formValues = watch();
    const templates = [
        {
            id: 1,
            name: "Template 1",
            description: "Classic invoice template",
            img: template1,
            component: <InvoiceTemplate1 {...formValues} />,
        },
        {
            id: 2,
            name: "Template 2",
            description: "Modern invoice template",
            img: template2,
            component: <InvoiceTemplate2 {...formValues} />,
        },
        {
            id: 3,
            name: "Template 3 - Professional Blue",
            description: "Professional blue header template with clean layout",
            img: template1, // TODO: Replace with template3 image when available
            component: <InvoiceTemplate3 {...formValues} />,
        },
        {
            id: 4,
            name: "Template 4 - Tax Invoice",
            description: "Professional tax invoice with GST breakdown",
            img: template1, // TODO: Replace with template4 image when available
            component: <InvoiceTemplate4 {...formValues} />,
        },
    ];
    return (
        <>
            <div className="w-full">
                <Label>Choose Invoice Template:</Label>

                <div>
                    <Card>
                        <CardHeader>
                            Templates
                            <CardDescription>
                                Select one of the predefined templates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row overflow-x-auto gap-4 pb-2">
                                {templates.map((template, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col flex-shrink-0 gap-y-3 w-full sm:w-auto"
                                    >
                                        <p className="font-medium">{template.name}</p>

                                        <div className="relative">
                                            {formValues.details.pdfTemplate ===
                                                template.id && (
                                                <div className="shadow-lg absolute right-2 top-2 rounded-full bg-blue-300 dark:bg-blue-600 p-1">
                                                    <Check className="h-5 w-5" />
                                                </div>
                                            )}
                                            <Image
                                                src={template.img}
                                                alt={template.name}
                                                width={300}
                                                height={700}
                                                placeholder="blur"
                                                className="cursor-pointer rounded-lg border-2 hover:border-blue-600 transition-all w-full sm:w-[300px] h-auto"
                                                onClick={() =>
                                                    setValue(
                                                        "details.pdfTemplate",
                                                        template.id
                                                    )
                                                }
                                            />
                                            {/* {template.component} */}
                                        </div>

                                        <BaseButton
                                            onClick={() =>
                                                setValue(
                                                    "details.pdfTemplate",
                                                    template.id
                                                )
                                            }
                                            className="w-full"
                                        >
                                            Select
                                        </BaseButton>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default TemplateSelector;
