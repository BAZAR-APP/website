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
    loyaltyPoints: load('loyalty-points'),
    luxuryExperience: load('luxuryExperience'),
    whyBookSection: load('whyBookSection'),
    destinationSection: load('destinationSection'),
    chaletsCard: load('chaletsCard'),
    rewardsSection: load('rewardsSection'),
    chatHero: load('chatHero'),
    downloadApp: load('downloadApp'),
    footer: load('footer'),
    filter: load('filter'),
    profile: load('profile'),
    accountDetails: load('accountDetails'),
    profileChaletListing: load('profileChaletListing'),
    passwordDetail: load('passwordDetail'),
    profileBilling: load('profileBilling'),
    navigation: load('navigation'),
    myBookings: load('myBookings')
  };
};