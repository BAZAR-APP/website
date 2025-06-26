import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from './toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const copyToClipboard = async (content: any) => {
  try {
    await navigator.clipboard.writeText(content)
    toast.success('Link copied to clipboard!')
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = content
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    toast.success('Link copied to clipboard!')
  }
}
export function extractErrorMessage(error: any): string {
  if (!error) return 'Unknown error occurred'

  if (error.response && error.response.data) {
    const data = error.response.data

    if (typeof data === 'string') return data

    if (typeof data.message === 'string') return data.message

    if (Array.isArray(data.message)) return data.message.join(', ')

    if (typeof data.message === 'string') return data.message

    return JSON.stringify(data)
  }

  if (error.message) return error.message

  if (typeof error === 'string') return error

  return 'Something went wrong'
}

export function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

interface TierInfo {
  name: string
  range: string
  title: string
  message: string
  icon: string
}

export const getTierInfo = (tier: string, lang: 'en' | 'ar' = 'en'): TierInfo => {
  const translations = {
    platinum: {
      en: {
        name: 'Platinum',
        range: '0 – 499 points',
        title: 'Platinum Tier: Keep Earning!',
        message: 'Earn more points to reach Gold and unlock more perks.',
      },
      ar: {
        name: 'بلاتين',
        range: '٠ - ٤٩٩ نقطة',
        title: 'الطبقة البلاتينية: استمر في الكسب!',
        message: 'اكسب المزيد من النقاط للوصول إلى الذهبية والاستفادة من مزايا إضافية.',
      },
    },
    gold: {
      en: {
        name: 'Gold',
        range: '500 – 899 points',
        title: 'Gold Tier: Unlock More Rewards!',
        message:
          'Earn 200 more points to unlock a free booking and enjoy exclusive discounts on your next stay.',
      },
      ar: {
        name: 'ذهبي',
        range: '٥٠٠ - ٨٩٩ نقطة',
        title: 'الطبقة الذهبية: اكشف المزيد من المكافآت!',
        message: 'اكسب ٢٠٠ نقطة إضافية للحصول على حجز مجاني والاستفادة من خصومات حصرية.',
      },
    },
    diamond: {
      en: {
        name: 'Diamond',
        range: '2000+ points',
        title: 'Diamond Tier: You’ve Made It!',
        message: 'Enjoy premium benefits, free bookings, and VIP treatment.',
      },
      ar: {
        name: 'ماسي',
        range: '٢٠٠٠+ نقطة',
        title: 'الطبقة الماسية: لقد وصلت!',
        message: 'استمتع بالمزايا المميزة والحجوزات المجانية والمعاملة الخاصة.',
      },
    },
    unknown: {
      en: {
        name: 'Unknown',
        range: '',
        title: 'Unknown Tier',
        message: 'Start earning to unlock rewards!',
      },
      ar: {
        name: 'غير معروف',
        range: '',
        title: 'طبقة غير معروفة',
        message: 'ابدأ في الكسب لفتح المكافآت!',
      },
    },
  }

  const key = tier?.toLowerCase() as keyof typeof translations
  const tierData = translations[key] || translations.unknown

  return {
    ...tierData[lang],
    icon:
      key === 'platinum'
        ? '/images/platinumTier.svg'
        : key === 'gold'
          ? '/images/goldTier.svg'
          : key === 'diamond'
            ? '/images/platinumTier.svg'
            : '/icons/default.png',
  }
}

export default function calculateCustomLoyltyPointsPrice(
  pointsToBuy: number,
  userTier: string,
): number {
  let rate: number

  switch (userTier) {
    case 'platinum':
      rate = 8
      break
    case 'gold':
      rate = 27
      break
    case 'diamond':
      rate = 36
      break
    default:
      throw new Error('Invalid user tier')
  }

  const price = pointsToBuy / rate
  return Number(price.toFixed(2))
}
