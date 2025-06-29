// app/[locale]/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";
import { ThemeProvider } from "@/components/Themes/ThemeProvider";

// navigation
// MODIFICATION: Importez 'getMessages' depuis 'next-intl/server'
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

// Votre configuration d'i18n (assurez-vous que ce chemin est correct)
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
    title: siteConfig.siteNameFull,
    description: siteConfig.description,
};

// MODIFICATION: La signature de la fonction est mise à jour
export default async function RootLayout({
    children,
    params: { locale }, // Déstructuration directe de 'locale'
}: {
    children: React.ReactNode;
    params: { locale: string }; // 'params' n'est plus une Promise
}) {
    // La vérification de la locale reste la même, mais 'locale' est déjà disponible
    // La fonction 'hasLocale' n'existe plus dans les versions récentes de next-intl, 
    // vous devriez probablement utiliser 'routing.locales.includes(locale)'
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // MODIFICATION: Récupérer les messages pour la locale actuelle
    let messages;
    try {
        messages = await getMessages();
    } catch (error) {
        // Si les messages ne peuvent pas être chargés, on renvoie une 404
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {/* MODIFICATION: Passez 'locale' et 'messages' au Provider */}
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}