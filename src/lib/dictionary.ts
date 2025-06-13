// Remove 'server-only' import as it's causing render delays
import { builtDictionaries, Dictionary } from './dictionary-builder';
import { Locale } from '../../i18n.config';

// Make dictionaries synchronous since builtDictionaries is already available
const dictionaries: Record<Locale, () => Dictionary> = {
  en: () => builtDictionaries.en as unknown as Dictionary,
  ar: () => builtDictionaries.ar as unknown as Dictionary,
};

// Make getDictionary synchronous
export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale]();
};

// Re-export the Dictionary type for use in components
export type { Dictionary };