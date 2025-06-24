import { create } from 'zustand'
type SelectedPoints = {
  price: number
  points: number
}
type PointsState = {
  loyltyPoints: SelectedPoints | null
  setLoyltyPoints: (plan: SelectedPoints | null) => void
  resetPoints: () => void
}

import { persist } from 'zustand/middleware'

export const useBuyLoyltyPointsStore = create(
  persist<PointsState>(
    (set) => ({
      loyltyPoints: null,

      setLoyltyPoints: (plan) => set({ loyltyPoints: plan }),
      resetPoints: () =>
        set({
          loyltyPoints: null,
        }),
    }),
    { name: 'points-storage' },
  ),
)
