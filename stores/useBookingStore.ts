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
}

import { persist } from 'zustand/middleware'
import { ChaletBedroom, ChaletSubscription } from '../types/chalets'

export const useBookingStore = create(
  persist<BookingState>(
    (set) => ({
      selectedPlan: null,
      selectedRoom: null,
      selectedDates: { checkIn: new Date(), checkOut: new Date() },
      guests: 1,
      setPlan: (plan) => set({ selectedPlan: plan }),
      setRoom: (room) => set({ selectedRoom: room }),
      setDates: (checkIn, checkOut) => set({ selectedDates: { checkIn, checkOut } }),
      setGuests: (guests) => set({ guests }),
      resetBooking: () =>
        set({
          selectedPlan: null,
          selectedRoom: null,
          selectedDates: { checkIn: new Date(), checkOut: new Date() },
          guests: 1,
        }),
    }),
    { name: 'booking-storage' },
  ),
)
