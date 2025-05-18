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
    { code: "sr", label: "Srpski", flag: "🇷🇸" }, // Serbe en alphabet latin
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "hr", label: "Hrvatski", flag: "🇭🇷" },
    { code: "fr", label: "Français", flag: "🇫🇷" },

];

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();



    const handleChange = (locale: string) => {

        // Découpe l'URL en segments et filtre les éléments vides
        const segments = pathname.split("/").filter(Boolean);
        // Si le premier segment correspond à une locale, on le remplace
        if (segments.length > 0 && locales.some((l) => l.code === segments[0])) {
            segments[0] = locale;
        } else {
            // Sinon, on insère la nouvelle locale en début d'URL
            segments.unshift(locale);
        }
        const newPath = `/${segments.join("/")}`;
        // router.replace est utilisé ici pour éviter de créer une nouvelle entrée dans l'historique
        router.replace(newPath);
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
                {locales.map((localeObj) => (
                    <DropdownMenuItem
                        key={localeObj.code}
                        onClick={() => handleChange(localeObj.code)}
                    >
                        <span className="mr-2">{localeObj.flag}</span>
                        {localeObj.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
