"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GlobeIcon } from "lucide-react";

const locales = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "sr", label: "Српски", flag: "🇷🇸" },
    { code: "hr", label: "Hrvatski", flag: "🇭🇷" },
];

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (locale: string) => {
        const segments = pathname.split("/");
        segments[1] = locale;
        router.push(segments.join("/"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center">
                    <GlobeIcon className="w-4 h-4" />
                    {locales.find((l) => l.code === currentLocale)?.flag}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {locales.map((locale) => (
                    <DropdownMenuItem key={locale.code} onClick={() => handleChange(locale.code)}>
                        <span className="mr-2">{locale.flag}</span>
                        {locale.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
