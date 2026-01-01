import { useMemo } from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/img/elite8digital.png";

// ShadCn
import { Card } from "@/components/ui/card";

// Components
import { DevDebug, LanguageSelector, ThemeSwitcher } from "@/app/components";

const BaseNavbar = () => {
    const devEnv = useMemo(() => {
        return process.env.NODE_ENV === "development";
    }, []);

    return (
        <header className="w-full px-4 lg:px-0 lg:container z-[99] py-4">
            <nav>
                <Card className="flex flex-wrap justify-between items-center px-3 sm:px-5 py-3 gap-3 sm:gap-5">
                    <Link href={"/"}>
                        <Image
                            src={Logo}
                            alt="Elite8Digital Logo"
                            width={190}
                            height={100}
                            loading="eager"
                            className="w-[140px] sm:w-[190px] h-auto"
                        />
                    </Link>
                    {/* ? DEV Only */}
                    {devEnv && <DevDebug />}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <LanguageSelector />
                        <ThemeSwitcher />
                    </div>
                </Card>
            </nav>
        </header>
    );
};

export default BaseNavbar;
