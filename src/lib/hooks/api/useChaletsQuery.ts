import { useQuery } from '@tanstack/react-query'
import { useChaletFiltersStore } from '../../../../stores/useChaletFiltersStore'
import { useShallow } from 'zustand/react/shallow'
import { useMemo } from 'react'
import api from '@/lib/axios'
import { ChaletResponse } from '../../../../types/chalets'

const fetchChalets = async (filters: any): Promise<ChaletResponse> => {
  const searchParams = new URLSearchParams()

  for (const key in filters) {
    const value = filters[key]
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v))
    } else {
      searchParams.set(key, value)
    }
  }

  const res = await api.get('/chalets?' + searchParams.toString())
  return res.data
}

export const useChaletsQuery = (enabled = true) => {
  const filters = useChaletFiltersStore(
    useShallow((state) => ({
      page: state.page,
      limit: state.limit,
      language: state.language,
      viewType: state.viewType,
      city: state.city,
      minPrice: state.minPrice,
      maxPrice: state.maxPrice,
      amenities: state.amenities,
    })),
  )

  const memoizedFilters = useMemo(() => filters, [filters])

  return useQuery({
    queryKey: ['chalets', memoizedFilters],
    queryFn: () => fetchChalets(memoizedFilters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled,
  })
}
