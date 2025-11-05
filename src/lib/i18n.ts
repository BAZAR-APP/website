import { readFileSync } from "fs";
import { join } from "path";
import { Locale } from "../../i18n.config";

export const getMessages = (locale: Locale) => {
  const load = (file: string) => {
    const path = join(process.cwd(), 'src', 'lib', 'dictionaries', locale, `${file}.json`);
    return JSON.parse(readFileSync(path, 'utf8'));
  };

  return {
    common: load('common'),
    banner: load('banner'),
    searchHeader: load('searchHeader'),
    loyaltyPoints: load('loyalty-Points'),
  };
};