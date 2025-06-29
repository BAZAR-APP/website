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
  is24HourNotice: boolean
  customizationCategoryId: string
  createdAt: string
  updatedAt: string
  selectedQuantity?: string
  customizationCategory: {
    id: string
    title: string
  }
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
  id: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  noOfNights: number;
  noOfGuests: number;
  totalCostAgainstNights: number;
  refundableDepositAmount: number;
  grandTotal: number;
  chaletId: string;
  userId: string;
  sleepingRoomId: string | null;
  chaletSubscriptionId: string | null;
  bookingStatus: 'pending' | 'confirmed' | 'cancelled' | string; // You can tighten this union if other statuses are known
}
