import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/routing';

export default createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
