import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/routing';

export default createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  // Exclut explicitement les fichiers statiques
  matcher: [
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
    '/', 
    '/(sr|fr|en|hr)/:path*'
  ]
};