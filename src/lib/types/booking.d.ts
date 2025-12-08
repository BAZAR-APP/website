import { Chalet } from '../../../types/chalets'

export type AddOnItem = {
  icon: string
  label: string
  price: number
  quantity?: number
  notice?: string
}
export type Customization = {
  id: string
  title: string
  costUnit: string
  costPerNight: number
  iconTitle: string | null
  iconPhotoId: string
  iconPhotoUrl: string | null
  is24HourNotice: boolean
  customizationCategoryId: string
  createdAt: string
  updatedAt: string
  selectedQuantity?: string
  selectedDate?: string
  customizationCategory: {
    id: string
    title: string
  }
  cost?: number
  chaletCustomizationId?: string
}

export type GroupedCustomization = {
  customizationCategoryId: string
  customizationCategory: {
    id: string
    title: string
  }
  customizations: Customization[]
}

export interface IBooking {
  id: string
  startDate: string // ISO date string
  endDate: string // ISO date string
  noOfNights: number
  noOfGuests: number
  totalCostAgainstNights: number
  refundableDepositAmount: number
  additionalFeeForFullRefund?: number
  grandTotal: number
  chaletId: string
  userId: string
  sleepingRoomId: string | null
  chaletSubscriptionId: string | null
  paymentStatus: 'fullPaid' | 'halfPaid'
  paymentId?: string // UUID of the payment record
  createdAt?: string // ISO date string
  updatedAt?: string // ISO date string
  payment?: {
    id: string
  }
  payments?: Array<{
    id: string
    bookingTotalAmount: number
    totalPaidAmount: number
    type: string
    status: string
    bookingId: string
    trackingId?: number
    createdAt: string
    updatedAt: string
  }>
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | string // You can tighten this union if other statuses are known
  review: {
    rating: string
    id: string
  }
  chalet: Chalet
  bookingCustomizations?: {
    id: string
    noOfCustomizations: number
    singleUnitCost: number
    totalCost: number
    customizationId: string
    customization: {
      id: string
      title: string
      titleInArabic: string
      costUnit: string
      costUnitInArabic: string
      costPerNight: number
      costPerNightInArabic: string
      iconTitle: string
      iconPhotoId: string
      iconPhotoUrl: string
      is24HourNotice: boolean
      customizationCategoryId: string
      customizationCategory: {
        id: string
        title: string
      }
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
    chaletCustomization:any
  }[]
}
