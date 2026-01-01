"use client";

// React Wizard
import { useWizard } from "react-use-wizard";

// Components
import { BaseButton } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { ArrowLeft, ArrowRight } from "lucide-react";

const WizardNavigation = () => {
    const { isFirstStep, isLastStep, handleStep, previousStep, nextStep } =
        useWizard();

    const { _t } = useTranslationContext();
    return (
        <div className="flex flex-wrap justify-end gap-3 sm:gap-5">
            {!isFirstStep && (
                <BaseButton
                    tooltipLabel="Go back to the previous step"
                    onClick={previousStep}
                    className="flex-1 sm:flex-none"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {_t("form.wizard.back")}
                </BaseButton>
            )}
            <BaseButton
                tooltipLabel="Go to the next step"
                disabled={isLastStep}
                onClick={nextStep}
                className="flex-1 sm:flex-none"
            >
                {_t("form.wizard.next")}
                <ArrowRight className="h-4 w-4" />
            </BaseButton>
        </div>
    );
};

export default WizardNavigation;
