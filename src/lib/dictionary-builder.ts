// import 'server-only'
// import { Locale } from '@/i18n.config';

// // Import individual page dictionaries
// import enNavigation from './dictionaries/en/navigation.json';
// import enHome from './dictionaries/en/home.json';
// import enAbout from './dictionaries/en/about.json';
// import enContact from './dictionaries/en/contact.json';
// import enFooter from './dictionaries/en/footer.json';
// import enAuth from './dictionaries/en/auth.json';

// import arNavigation from './dictionaries/ar/navigation.json';
// import arHome from './dictionaries/ar/home.json';
// import arAbout from './dictionaries/ar/about.json';
// import arContact from './dictionaries/ar/contact.json';
// import arFooter from './dictionaries/ar/footer.json';
// import arAuth from './dictionaries/ar/auth.json';
import arloyaltyPoints from './dictionaries/ar/loyalty-points.json'
import enloyaltyPoints from './dictionaries/en/loyalty-points.json'
import arcommon from './dictionaries/ar/common.json'
import encommon from './dictionaries/en/common.json'
import { string } from 'zod'
// Build complete dictionaries from individual page files
const buildEnglishDictionary = () => ({
  //   navigation: enNavigation,
  page: {
    loyaltyPoints: enloyaltyPoints,
    common: encommon,

    // home: enHome,
    // about: enAbout,
    // contact: enContact,
  },
  //   footer: enFooter,
  //   auth: enAuth,
})

const buildArabicDictionary = () => ({
  //   navigation: arNavigation,
  page: {
    loyaltyPoints: arloyaltyPoints,
    common: arcommon,

    // home: arHome,
    // about: arAbout,
    // contact: arContact,
  },
  //   footer: arFooter,
  //   auth: arAuth,
})

// Export built dictionaries
export const builtDictionaries = {
  en: buildEnglishDictionary(),
  ar: buildArabicDictionary(),
}

// Define the structure of the dictionary
export interface Dictionary {
  navigation: {
    home: string
    about: string
    contact: string
  }
  page: {
    home: {
      title: string
      description: string
      cta: string
    }
    loyaltyPoints: {
      title: string
      name: string
      welcomeMessage: string
      description: string
      tier: {
        name: string
        range: string
        earnedPoints: number
        nextTierMessage: string
        goldReward: string
      }
      actions: {
        title: string
        description: string
        cta: string
      }[]
      discountsTitle: string
      redeemableDiscounts: {
        title: string
        pointsRequired: number
        icon: string
        cta: string
      }[]
    }
    common:{
      redeem_now:string
    }
    about: {
      title: string
      description: string
    }
    contact: {
      title: string
      description: string
      form: {
        name: string
        email: string
        message: string
        submit: string
      }
    }
  }
  footer: {
    rights: string
    language: string
  }
  auth: {
    signIn: string
    signOut: string
    dashboard: string
    profile: string
  }
}
