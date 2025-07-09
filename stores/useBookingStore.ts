import { create } from 'zustand'

type BookingState = {
  selectedPlan: ChaletSubscription | null
  selectedRoom: ChaletBedroom | null
  selectedDates: { checkIn: Date; checkOut: Date }
  guests: number
  setPlan: (plan: ChaletSubscription | null) => void
  setRoom: (room: ChaletBedroom) => void
  setDates: (checkIn: Date, checkOut: Date) => void
  setGuests: (guests: number) => void
  setIsDiscountApplied: (isDiscountApplied: boolean) => void
  resetBooking: () => void
  setNoOfNights: (guests: number) => void
  setTotalCostAgainstNights: (guests: number) => void
  setPackageAmount: (guests: number) => void
  noOfNights: number | null
  totalCostAgainstNights: number | null
  packageAmount: number | null
  chaletDetails: Chalet | null
  isDiscountApplied: boolean
  setChaletDetails: (chalet: Chalet | null) => void
  setDiscountedTotal: (discountedTotal: number | null) => void
  discountedTotal: number | null
}

import { persist } from 'zustand/middleware'
import { Chalet, ChaletBedroom, ChaletSubscription } from '../types/chalets'

export const useBookingStore = create(
  persist<BookingState>(
    (set) => ({
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
      setIsDiscountApplied: (isDiscountApplied) => set({ isDiscountApplied: isDiscountApplied }),
      setDiscountedTotal: (discountedTotal) => set({ discountedTotal: discountedTotal }),
      setPlan: (plan) => set({ selectedPlan: plan }),
      setChaletDetails: (chalet) => set({ chaletDetails: chalet }),
      setRoom: (room) => set({ selectedRoom: room }),
      setDates: (checkIn, checkOut) => set({ selectedDates: { checkIn, checkOut } }),
      setGuests: (guests) => set({ guests }),
      setNoOfNights: (noOfNights) => set({ noOfNights }),
      setPackageAmount: (packageAmount) => set({ packageAmount }),
      setTotalCostAgainstNights: (totalCostAgainstNights) => set({ totalCostAgainstNights }),
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
        }),
    }),
    { name: 'booking-storage' },
  ),
)
