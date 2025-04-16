import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ locale }) => {
  // Si aucune locale n'est fournie, utilisez la locale par défaut
  const finalLocale = locale || routing.defaultLocale;
  
  // Chargez les messages pour la locale
  const messages = (await import(`./messages/${finalLocale}.json`)).default;
  
  // Retournez l'objet de configuration avec la locale et les messages
  return {
    locale: finalLocale,
    messages,
    // Optionnel : vous pouvez ajouter d'autres configurations ici
    // timeZone: 'Europe/Belgrade',
    // now: new Date()
  };
});