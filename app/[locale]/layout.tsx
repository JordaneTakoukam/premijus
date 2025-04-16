
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// navigation
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Suspense } from "react";
import LanguageLoading from "@/components/LanguageLoading";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Premijus",
    description: "Entreprise de construction en Serbie",
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;

}) {

    // Ensure that the incoming `locale` is valid
    const { locale } = await params;

    
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }


    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Suspense fallback={<LanguageLoading />}>
                    <ThemeProvider>
                        <NextIntlClientProvider>
                            {children}
                        </NextIntlClientProvider>
                    </ThemeProvider>
                </Suspense>

            </body>
        </html>
    );
}
