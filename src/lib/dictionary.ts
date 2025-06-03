import 'server-only';
import { Locale } from '../../i18n.config';

// Define the structure of the dictionary
interface Dictionary {
  navigation: {
    home: string;
    about: string;
    contact: string;
  };
  page: {
    home: {
      title: string;
      description: string;
      cta: string;
    };
    about: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
      form: {
        name: string;
        email: string;
        message: string;
        submit: string;
      };
    };
  };
  footer: {
    rights: string;
    language: string;
  };
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  ar: () => import('./dictionaries/ar.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
};