import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from './toast'
import {
  parseISO,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from 'date-fns'

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

type TierInfo = {
  name: string
  range: string
  title: string
  message: string
  icon: string
  iconURL?: string
}

const tiers = [
  { key: 'platinum', min: 0, max: 499 },
  { key: 'gold', min: 500, max: 899 },
  { key: 'diamond', min: 900, max: Infinity },
]

export const getTierInfo = (
  tier: string,
  lang: 'en' | 'ar' = 'en',
  currentPoints?: number,
): TierInfo => {
  const translations = {
    platinum: {
      en: {
        name: 'Platinum',
        range: '0 – 499 points',
        title: 'Platinum Tier: Keep Earning!',
        message: 'Earn {{morePoints}} more points to reach Gold and unlock more perks.',
      },
      ar: {
        name: 'بلاتين',
        range: '٠ - ٤٩٩ نقطة',
        title: 'الطبقة البلاتينية: استمر في الكسب!',
        message: 'اكسب {{morePoints}} نقطة إضافية للوصول إلى الذهبية والاستفادة من مزايا إضافية.',
      },
    },
    gold: {
      en: {
        name: 'Gold',
        range: '500 – 899 points',
        title: 'Gold Tier: Unlock More Rewards!',
        message:
          'Earn {{morePoints}} more points to unlock Diamond tier and enjoy exclusive rewards.',
      },
      ar: {
        name: 'ذهبي',
        range: '٥٠٠ - ٨٩٩ نقطة',
        title: 'الطبقة الذهبية: اكشف المزيد من المكافآت!',
        message: 'اكسب {{morePoints}} نقطة إضافية للوصول إلى الماسية والاستمتاع بمزايا مميزة.',
      },
    },
    diamond: {
      en: {
        name: 'Diamond',
        range: '900+ points',
        title: 'Diamond Tier: You’ve Made It!',
        message: 'Enjoy premium benefits, free bookings, and VIP treatment.',
      },
      ar: {
        name: 'ماسي',
        range: '٩٠٠+ نقطة',
        title: 'الطبقة الماسية: لقد وصلت!',
        message: 'استمتع بالمزايا المميزة والحجوزات المجانية والمعاملة الخاصة.',
      },
    },
    unknown: {
      en: {
        name: 'Unknown',
        range: '0',
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
  const langData = tierData[lang]

  let morePoints: number | null = null
  const currentTierIndex = tiers.findIndex((t) => t.key === key)
  if (currentPoints !== undefined && currentTierIndex > -1 && currentTierIndex < tiers.length - 1) {
    const nextTier = tiers[currentTierIndex + 1]
    morePoints = Math.max(nextTier.min - currentPoints, 0)
  }
  const message =
    morePoints !== null
      ? langData.message.replace('{{morePoints}}', morePoints.toString())
      : langData.message

  return {
    ...langData,
    message,
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
  return Number(price)
}
  /**
   * Calculates loyalty points for a booking
   * Formula: Number of nights × Base points (from chalet)
   * For hourly bookings, only base points are awarded (no per-night bonus)
   * @param basePoints - Base points from the chalet (chalet.noOfLoyalityPoints)
   * @param numberOfNights - The number of nights for the stay
   * @param isHourly - Whether this is an hourly booking (default: false)
   * @returns Total loyalty points earned
   */
  /**
 * Calculate split payment amounts that always sum to the exact total
 * @param totalAmount - The total amount to split
 * @returns Object with firstPayment and secondPayment that sum to totalAmount
 */
export function calculateSplitPayment(totalAmount: number): { firstPayment: number; secondPayment: number } {
  // Use Math.floor for first payment to ensure we don't exceed total
  const firstPayment = Math.floor(totalAmount / 2)
  // Second payment is the remainder to ensure exact total
  const secondPayment = totalAmount - firstPayment
  return { firstPayment, secondPayment }
}

export function calculateLoyaltyPoints(
    basePoints: number | null | undefined,
    numberOfNights: number | null | undefined,
    isHourly: boolean = false,
  ): number {
    const base = basePoints ?? 0
    
    // Hourly bookings only get base points, no per-night bonus
    if (isHourly) {
      return base
    }
    
    const nights = numberOfNights ?? 0
    // Multiply number of nights by base points
    // Example: 5 nights × 200 chalet points = 1,000 points
    return nights * base
  }
export const formatRelativeTime = (dateString: string) => {
  try {
    const date = parseISO(dateString)
    const now = new Date()
    const minutes = differenceInMinutes(now, date)
    const hours = differenceInHours(now, date)

    const days = differenceInDays(now, date)
    const weeks = differenceInWeeks(now, date)
    const months = differenceInMonths(now, date)

    if (minutes < 1) {
      return 'now'
    } else if (minutes < 60) {
      return `${minutes}m`
    } else if (hours < 24) {
      return `${hours}h`
    } else if (days < 7) {
      return `${days}d`
    } else if (weeks < 4) {
      return `${weeks}w`
    } else {
      return `${months}mo`
    }
  } catch (error) {
    return 'Invalid date'
  }
}
  const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
  }
// Helper to parse "2025-12-12" as LOCAL date (not UTC)
  export const expandDateRange = (startStr: string, endStr: string): Date[] => {
    const startDate = parseLocalDate(startStr)
    const endDate = parseLocalDate(endStr)

    const dates: Date[] = []
    const current = new Date(startDate)
    current.setHours(0, 0, 0, 0)
    const end = new Date(endDate)
    end.setHours(0, 0, 0, 0)

    while (current <= end) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return dates
  }
