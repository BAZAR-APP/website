import { create } from 'zustand'

export type ChaletFilters = {
  page: number
  limit: number
  language: 'en' | 'ar'
  viewType: string[]
  city: string[]
  minPrice: number
  maxPrice: number
  amenities: string[]
  setFilters: (filters: Partial<ChaletFilters>) => void
  resetFilters: () => void
}

export const useChaletFiltersStore = create<ChaletFilters>((set) => ({
  page: 1,
  limit: 20,
  language: 'en',
  viewType: [],
  city: [],
  minPrice: 0,
  maxPrice: 3000,
  amenities: [],
  setFilters: (
    filters: Partial<ChaletFilters> | ((state: ChaletFilters) => Partial<ChaletFilters>),
  ) =>
    set((state) => {
      const updates = typeof filters === 'function' ? filters(state) : filters
      return { ...state, ...updates }
    }),
  resetFilters: () =>
    set({
      page: 1,
      limit: 20,
      language: 'en',
      viewType: [],
      city: [],
      minPrice: 0,
      maxPrice: 3000,
      amenities: [],
    }),
}))
