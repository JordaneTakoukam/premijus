// i18n/request.ts (VERSION FINALE CORRECTE)

import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing'; // Assurez-vous que ce fichier exporte `locales`

// Définir les locales de manière explicite pour TypeScript
const locales = routing.locales;

export default getRequestConfig(async ({locale}) => {
  // Valider que la `locale` reçue du middleware est bien une de celles que vous supportez.
  // C'est une sécurité. Si ce n'est pas le cas, on affiche une page 404.
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    // Il n'y a pas besoin de retourner la locale ici, `next-intl` la gère.
    messages: (await import(`../messages/${locale}.json`)).default
    // IMPORTANT : Vérifiez que le chemin vers vos messages est correct.
    // Si votre dossier `i18n` est à la racine, et `messages` aussi,
    // le chemin est probablement `../messages/${locale}.json`. Ajustez si besoin.
  };
});