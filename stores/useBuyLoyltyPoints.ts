import { create } from 'zustand'
type SelectedPoints = {
  price: number
  points: number
  id?: string
  isCustom?:boolean
}
type PointsState = {
  selectedPackageLoyaltyPoints: SelectedPoints | null
  setSelectedPackageLoyaltyPoints: (plan: SelectedPoints | null) => void
  resetPoints: () => void
}

import { persist } from 'zustand/middleware'

export const useBuyLoyltyPointsStore = create(
  persist<PointsState>(
    (set) => ({
      selectedPackageLoyaltyPoints: null,

      setSelectedPackageLoyaltyPoints: (plan) => set({ selectedPackageLoyaltyPoints: plan }),
      resetPoints: () =>
        set({
          selectedPackageLoyaltyPoints: null,
        }),
    }),
    { name: 'points-storage' },
  ),
)
