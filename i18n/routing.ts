export const locales = ['sr', 'fr', 'en', 'hr'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'sr';

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed' as const,
  pathnames: {
    '/about': {
      sr: '/o-nama',
      fr: '/a-propos',
      en: '/about',
      hr: '/o-nama'
    }
  }
} as const;