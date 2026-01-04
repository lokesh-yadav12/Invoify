"use client";

// React Wizard
import { useWizard } from "react-use-wizard";

// Components
import { BaseButton } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Icons
import { ArrowLeft, ArrowRight, FileInput } from "lucide-react";

const WizardNavigation = () => {
    const { isFirstStep, isLastStep, handleStep, previousStep, nextStep } =
        useWizard();

    const { _t } = useTranslationContext();
    const { invoicePdfLoading } = useInvoiceContext();

    return (
        <div className="flex flex-wrap justify-end gap-3 sm:gap-5">
            {!isFirstStep && (
                <BaseButton
                    tooltipLabel="Go back to the previous step"
                    onClick={previousStep}
                    className="flex-1 sm:flex-none"
                    type="button"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {_t("form.wizard.back")}
                </BaseButton>
            )}
            {isLastStep ? (
                <BaseButton
                    type="submit"
                    tooltipLabel="Generate your invoice"
                    loading={invoicePdfLoading}
                    loadingText="Generating your invoice"
                    className="flex-1 sm:flex-none"
                >
                    <FileInput />
                    {_t("actions.generatePdf")}
                </BaseButton>
            ) : (
                <BaseButton
                    tooltipLabel="Go to the next step"
                    onClick={nextStep}
                    className="flex-1 sm:flex-none"
                    type="button"
                >
                    {_t("form.wizard.next")}
                    <ArrowRight className="h-4 w-4" />
                </BaseButton>
            )}
        </div>
    );
};

export default WizardNavigation;
