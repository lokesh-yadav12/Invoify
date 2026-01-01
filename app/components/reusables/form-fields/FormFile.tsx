"use client";

import React, { ChangeEvent, useRef, useState } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn components
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

// Components
import { BaseButton } from "@/app/components";

// Icons
import { ImageMinus, Image } from "lucide-react";

// Types
import { NameType } from "@/types";

type FormFileProps = {
    name: NameType;
    label?: string;
    placeholder?: string;
};

const FormFile = ({ name, label, placeholder }: FormFileProps) => {
    const { control, setValue } = useFormContext();

    const logoImage = useWatch({
        name: name,
        control,
    });

    // Set default logo if none exists
    const defaultLogo = "/assets/img/elite8digital.png";
    const [base64Image, setBase64Image] = useState<string>(logoImage || defaultLogo);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Sync with form value and set default if empty or if it's an old Invoify logo
    React.useEffect(() => {
        if (!logoImage || logoImage === "" || logoImage.includes("elite8digital")) {
            setValue(name, defaultLogo);
            setBase64Image(defaultLogo);
        } else {
            setBase64Image(logoImage);
        }
    }, [logoImage, name, setValue, defaultLogo]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target!.result as string;
                setBase64Image(base64String);
                setValue(name, base64String); // Set the value for form submission
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        const defaultLogo = "/assets/img/elite8digital.png";
        setBase64Image(defaultLogo);
        setValue(name, defaultLogo);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <Label>{label}:</Label>
                        {base64Image ? (
                            <img
                                id="logoImage"
                                src={base64Image}
                                style={{
                                    objectFit: "contain",
                                    width: "6rem",
                                    height: "5rem",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    objectFit: "contain",
                                    width: "10rem",
                                    height: "7rem",
                                }}
                            >
                                <Label
                                    htmlFor={name}
                                    className="flex justify-center items-center h-[7rem] w-[10rem] cursor-pointer rounded-md bg-gray-100 dark:bg-slate-800 border border-black dark:border-white hover:border-blue-500"
                                >
                                    <>
                                        <div className="flex flex-col items-center">
                                            <Image />
                                            <p>{placeholder}</p>
                                        </div>
                                        <FormControl>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                id={name}
                                                className="hidden"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </>
                                </Label>
                            </div>
                        )}
                    </FormItem>
                )}
            />
            {base64Image && (
                <div>
                    <BaseButton variant="outline" onClick={removeLogo}>
                        <ImageMinus />
                        Reset to Default Logo
                    </BaseButton>
                </div>
            )}
        </>
    );
};

export default FormFile;
