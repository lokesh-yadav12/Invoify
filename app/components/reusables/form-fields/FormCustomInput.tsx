// Components
import { BaseButton, FormInput } from "@/app/components";

// Icons
import { Trash2 } from "lucide-react";

type FormCustomInputProps = {
    index: number;
    location: string;
    removeField: (index: number) => void;
};

const FormCustomInput = ({
    index,
    location,
    removeField,
}: FormCustomInputProps) => {
    const nameKey = `${location}[${index}].key`;
    const nameValue = `${location}[${index}].value`;
    return (
        <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                <FormInput
                    name={nameKey}
                    placeholder="Name"
                    className="font-medium p-0 border-none h-[1.5rem] w-full sm:w-[4rem]"
                />

                <FormInput
                    name={nameValue}
                    placeholder="Value"
                    className="w-full sm:w-[10rem]"
                />
                <BaseButton
                    size="icon"
                    variant="destructive"
                    onClick={() => removeField(index)}
                    className="self-end sm:self-auto"
                >
                    <Trash2 className="h-4 w-4" />
                </BaseButton>
            </div>
        </>
    );
};

export default FormCustomInput;
