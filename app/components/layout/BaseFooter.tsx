"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

// Variables
import { AUTHOR_GITHUB } from "@/lib/variables";

const BaseFooter = () => {
    const { _t } = useTranslationContext();

    return (
        <footer className="w-full px-4 lg:px-0 lg:container py-10 mt-10">
            <p className="text-sm sm:text-base text-center lg:text-left">
                © {new Date().getFullYear()} Elite8Digital. All rights reserved.
            </p>
        </footer>
    );
};

export default BaseFooter;
