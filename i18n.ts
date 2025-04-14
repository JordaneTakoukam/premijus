import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    // Définissez une valeur par défaut ou gérez l'absence de locale
    locale = 'fr'; // Exemple : utilisation du français comme langue par défaut
  }
  const messages = (await import(`./messages/${locale}.json`)).default;
  return { locale, messages };
});
