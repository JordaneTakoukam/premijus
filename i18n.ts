import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ locale }) => {
  const finalLocale = locale || routing.defaultLocale;

  const messages = (await import(`./messages/${finalLocale}.json`)).default;

  return {
    locale: finalLocale,
    messages,
  };
});
