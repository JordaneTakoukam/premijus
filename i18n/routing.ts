import siteConfig from "@/configs/siteConfig";

// routing.ts
export const locales = ['sr-Latn', 'fr', 'en', 'hr'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = siteConfig.defaultLocale as Locale;

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed' as const,
} as const;
