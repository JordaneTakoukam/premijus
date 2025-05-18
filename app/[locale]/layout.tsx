import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { ThemeProvider } from "@/components/Themes/ThemeProvider";

// navigation
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import siteConfig from "@/configs/siteConfig";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.siteNameShort,
    description: siteConfig.description,
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Récupération et vérification de la locale
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider>
                    <NextIntlClientProvider>
                        {children}
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
