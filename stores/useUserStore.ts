// src/stores/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Discount } from '../types/user'

type User = {
  id: string
  name: string
  email: string
}
type selectedDiscount = {
  discountPercent: number
  couponCode: string
}
type UserState = {
  user: User | null
  setUser: (user: User) => void
  setSelectedDiscount: (selectedDiscount: selectedDiscount | null) => void
  clearUser: () => void
  redeemedDiscounts: Discount[]
  selectedDiscount: selectedDiscount | null
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      redeemedDiscounts: [],
      selectedDiscount: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null, redeemedDiscounts: [], selectedDiscount: null }),
      setredeemedDiscounts: (redeemedDiscounts: Discount[]) => set({ redeemedDiscounts }),
      setSelectedDiscount: (selectedDiscount: selectedDiscount | null) => set({ selectedDiscount }),
    }),
    {
      name: 'user-storage', // key in localStorage
      // optional: whitelist: ['user'], // persist only user property
    },
  ),
)
