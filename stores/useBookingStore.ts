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
  resetBooking: () => void
  setNoOfNights: (guests: number) => void
  setTotalCostAgainstNights: (guests: number) => void
  setPackageAmount: (guests: number) => void
  noOfNights: number | null
  totalCostAgainstNights: number | null
  packageAmount: number | null
}

import { persist } from 'zustand/middleware'
import { ChaletBedroom, ChaletSubscription } from '../types/chalets'

export const useBookingStore = create(
  persist<BookingState>(
    (set) => ({
      selectedPlan: null,
      selectedRoom: null,
      noOfNights: null,
      totalCostAgainstNights: null,
      packageAmount: null,
      selectedDates: { checkIn: new Date(), checkOut: new Date() },
      guests: 1,
      setPlan: (plan) => set({ selectedPlan: plan }),
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
          selectedDates: { checkIn: new Date(), checkOut: new Date() },
          guests: 1,
        }),
    }),
    { name: 'booking-storage' },
  ),
)
