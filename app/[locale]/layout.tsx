import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { ThemeProvider } from "@/components/Themes/ThemeProvider";

// navigation
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import siteConfig from "@/configs/siteConfig";
import { getRequestConfig } from "@/i18n/request"; // Importez votre configuration

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.siteNameFull,
    description: siteConfig.description,
};

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Chargez les messages de manière asynchrone
    let messages;
    try {
        const config = await getRequestConfig({ locale });
        messages = config.messages;
        
        if (!routing.locales.includes(locale as any)) {
            notFound();
        }
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider>
                    <NextIntlClientProvider 
                        locale={locale}
                        messages={messages}
                        timeZone="Europe/Paris" // Adaptez selon vos besoins
                    >
                        {children}
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}