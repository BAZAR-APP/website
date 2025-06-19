import { create } from 'zustand'

type BookingState = {
  selectedPlan: string | null
  selectedRoom: string | null
  selectedDates: { checkIn: Date | null; checkOut: Date | null }
  guests: number
  setPlan: (plan: string) => void
  setRoom: (room: string) => void
  setDates: (checkIn: Date, checkOut: Date) => void
  setGuests: (guests: number) => void
  resetBooking: () => void
}

import { persist } from 'zustand/middleware'

export const useBookingStore = create(
  persist<BookingState>(
    (set) => ({
      selectedPlan: null,
      selectedRoom: null,
      selectedDates: { checkIn: null, checkOut: null },
      guests: 1,
      setPlan: (plan) => set({ selectedPlan: plan }),
      setRoom: (room) => set({ selectedRoom: room }),
      setDates: (checkIn, checkOut) => set({ selectedDates: { checkIn, checkOut } }),
      setGuests: (guests) => set({ guests }),
      resetBooking: () =>
        set({
          selectedPlan: null,
          selectedRoom: null,
          selectedDates: { checkIn: null, checkOut: null },
          guests: 1,
        }),
    }),
    { name: 'booking-storage' },
  ),
)
