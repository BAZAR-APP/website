import { create } from 'zustand'

type BookingState = {
  selectedPlan: ChaletSubscription | null
  selectedRoom: ChaletBedroom | null
  selectedDates: { checkIn: Date; checkOut: Date }
  guests: number
  noOfNights: number | null
  totalCostAgainstNights: number | null
  packageAmount: number | null
  chaletDetails: Chalet | null
  isDiscountApplied: boolean
  discountedTotal: number | null
  discountCode: string | null
  bookingType: 'hourly' | 'night'
  refundedBookings: string[]
  setBookingType: (type: 'hourly' | 'night') => void
  setPlan: (plan: ChaletSubscription | null) => void
  setRoom: (room: ChaletBedroom) => void
  setDates: (checkIn: Date, checkOut: Date) => void
  setGuests: (guests: number) => void
  setIsDiscountApplied: (isDiscountApplied: boolean) => void
  setDiscountCode: (discountCode: string | null) => void
  resetBooking: () => void
  setNoOfNights: (guests: number) => void
  setTotalCostAgainstNights: (guests: number) => void
  setPackageAmount: (guests: number) => void
  setChaletDetails: (chalet: Chalet | null) => void
  setDiscountedTotal: (discountedTotal: number | null) => void
  addRefundedBooking: (bookingId: string) => void
  isBookingRefunded: (bookingId: string) => boolean
}

import { persist } from 'zustand/middleware'
import { Chalet, ChaletBedroom, ChaletSubscription } from '../types/chalets'

export const useBookingStore = create(
  persist<BookingState>(
    (set, get) => ({
      selectedPlan: null,
      selectedRoom: null,
      noOfNights: null,
      totalCostAgainstNights: null,
      packageAmount: null,
      chaletDetails: null,
      selectedDates: { checkIn: new Date(), checkOut: new Date() },
      guests: 1,
      discountedTotal: null,
      isDiscountApplied: false,
      discountCode: null,
      bookingType: 'night',
      refundedBookings: [],
      setIsDiscountApplied: (isDiscountApplied) => set({ isDiscountApplied: isDiscountApplied }),
      setDiscountCode: (discountCode) => set({ discountCode: discountCode }),
      setDiscountedTotal: (discountedTotal) => set({ discountedTotal: discountedTotal }),
      setPlan: (plan) => set({ selectedPlan: plan }),
      setBookingType: (type) => set({ bookingType: type }),
      setChaletDetails: (chalet) => set({ chaletDetails: chalet }),
      setRoom: (room) => set({ selectedRoom: room }),
      setDates: (checkIn, checkOut) => set({ selectedDates: { checkIn, checkOut } }),
      setGuests: (guests) => set({ guests }),
      setNoOfNights: (noOfNights) => set({ noOfNights }),
      setPackageAmount: (packageAmount) => set({ packageAmount }),
      setTotalCostAgainstNights: (totalCostAgainstNights) => set({ totalCostAgainstNights }),
      addRefundedBooking: (bookingId) =>
        set((state) => {
          if (!state.refundedBookings.includes(bookingId)) {
            return { refundedBookings: [...state.refundedBookings, bookingId] }
          }
          return state
        }),
      isBookingRefunded: (bookingId) => {
        return get().refundedBookings.includes(bookingId)
      },
      resetBooking: () =>
        set({
          selectedPlan: null,
          selectedRoom: null,
          noOfNights: null,
          totalCostAgainstNights: null,
          packageAmount: null,
          chaletDetails: null,
          selectedDates: { checkIn: new Date(), checkOut: new Date() },
          guests: 1,
          discountedTotal: null,
          isDiscountApplied: false,
          discountCode: null,
        }),
    }),
    { name: 'booking-storage' },
  ),
)
