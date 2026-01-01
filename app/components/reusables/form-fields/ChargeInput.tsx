"use client";

import React from "react";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Components
import { BaseButton } from "@/app/components";

// Icons
import { Percent, RefreshCw } from "lucide-react";

// Types
import { NameType } from "@/types";

type ChargeInputProps = {
    label: string;
    name: NameType;
    switchAmountType: (
        type: string,
        setType: React.Dispatch<React.SetStateAction<string>>
    ) => void;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    currency: string;
};

const ChargeInput = ({
    label,
    name,
    switchAmountType,
    type,
    setType,
    currency,
}: ChargeInputProps) => {
    const { control } = useFormContext();

    return (
        <>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="text-sm sm:text-base">{label}</div>

                <div className="flex items-center gap-1">
                    <BaseButton
                        variant="ghost"
                        size="icon"
                        onClick={() => switchAmountType(type, setType)}
                        className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </BaseButton>

                    <FormField
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center text-sm">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="w-[5rem] sm:w-[7rem]"
                                            placeholder={label}
                                            type="number"
                                            min="0"
                                            max="1000000"
                                            step="0.01"
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {type == "percentage" ? <Percent className="h-4 w-4" /> : <div className="text-sm">{currency}</div>}
                </div>
            </div>
        </>
    );
};

export default ChargeInput;
