import 'server-only';
import { builtDictionaries, Dictionary } from './dictionary-builder';
import { Locale } from '../../i18n.config';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => builtDictionaries.en as unknown as Dictionary,
  ar: async () => builtDictionaries.ar as unknown as Dictionary,
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};

// Re-export the Dictionary type for use in components
export type { Dictionary };