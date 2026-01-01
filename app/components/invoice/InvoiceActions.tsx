"use client";

// ShadCn
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Components
import {
    PdfViewer,
    BaseButton,
    NewInvoiceAlert,
    InvoiceLoaderModal,
    InvoiceExportModal,
} from "@/app/components";

// Contexts
import { useInvoiceContext } from "@/contexts/InvoiceContext";
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { FileInput, FolderUp, Import, Plus, RotateCcw } from "lucide-react";

const InvoiceActions = () => {
    const { invoicePdfLoading, newInvoice } = useInvoiceContext();

    const { _t } = useTranslationContext();
    return (
        <div className="w-full lg:w-[45%]">
            <Card className="h-auto lg:sticky lg:top-4 px-2">
              <div className="w-full">
                        {/* Live preview and Final pdf */}
                        <PdfViewer />
                    </div>
                <CardHeader>
                    <CardTitle>{_t("actions.title")}</CardTitle>
                    <CardDescription>
                        {_t("actions.description")}
                    </CardDescription>
                </CardHeader>

                <div className="flex flex-col flex-wrap items-center gap-2 pb-4">
                    <div className="flex flex-wrap justify-center gap-3 w-full px-2">
                        {/* Load modal button */}
                        <InvoiceLoaderModal>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Open load invoice menu"
                                disabled={invoicePdfLoading}
                            >
                                <FolderUp />
                                {_t("actions.loadInvoice")}
                            </BaseButton>
                        </InvoiceLoaderModal>

                        {/* Export modal button */}
                        <InvoiceExportModal>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Open load invoice menu"
                                disabled={invoicePdfLoading}
                            >
                                <Import />
                                {_t("actions.exportInvoice")}
                            </BaseButton>
                        </InvoiceExportModal>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 w-full px-2">
                        {/* New invoice button */}
                        <NewInvoiceAlert>
                            <BaseButton
                                variant="outline"
                                tooltipLabel="Get a new invoice form"
                                disabled={invoicePdfLoading}
                            >
                                <Plus />
                                {_t("actions.newInvoice")}
                            </BaseButton>
                        </NewInvoiceAlert>

                        {/* Reset form button */}
                        <NewInvoiceAlert
                            title="Reset form?"
                            description="This will clear all fields and the saved draft."
                            confirmLabel="Reset"
                            onConfirm={newInvoice}
                        >
                            <BaseButton
                                variant="destructive"
                                tooltipLabel="Reset entire form"
                                disabled={invoicePdfLoading}
                            >
                                <RotateCcw />
                                Reset Form
                            </BaseButton>
                        </NewInvoiceAlert>

                        {/* Generate pdf button */}
                        <BaseButton
                            type="submit"
                            tooltipLabel="Generate your invoice"
                            loading={invoicePdfLoading}
                            loadingText="Generating your invoice"
                        >
                            <FileInput />
                            {_t("actions.generatePdf")}
                        </BaseButton>
                    </div>

                    
                </div>
            </Card>
        </div>
    );
};

export default InvoiceActions;
