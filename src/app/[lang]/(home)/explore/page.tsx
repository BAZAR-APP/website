'use client'
import FilterSidebar from '@/components/FilterSidebar'
import Pagination from '@/components/Pagination'
import { PropertyCard } from '@/components'
import SearchHeader from '@/components/SearchHeader'
import SearchResults from '@/components/SearchResults'
import { Grid } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useChaletsQuery } from '@/lib/hooks/api/useChaletsQuery'
import { PropertyCardSkeleton } from '@/components/Skeletons/chaletsCardSkeleton'
import { Chalet } from '../../../../../types/chalets'
import { useBookingStore } from '../../../../../stores/useBookingStore'
import { useChaletFiltersStore } from '../../../../../stores/useChaletFiltersStore'

const ExploreChalets = () => {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('recommended')
  const { page, setFilters, city } = useChaletFiltersStore()

  const handlePageChange = (newPage: number) => {
    setFilters({ page: newPage })
  }
  const { resetBooking } = useBookingStore()

  const { data, isLoading } = useChaletsQuery()
  const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 0))
  return (
    <div className="min-h-screen lg:px-14 md:px-12 px-10 xxl-p mx-auto">
      <h2 className="font-semibold md:text-[39px] sm:text-2xl text-xl leading-11 text-[#19191A] pt-5">
        Explore Chalets
      </h2>

      <div className="flex lg:flex-row flex-col py-6 gap-1 xxl-gap">
        <FilterSidebar />
        <div className="full-width">
          <SearchHeader />
          <SearchResults
            location={city || ''}
            totalResults={data?.data?.length || 0}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {isLoading ? (
            <Grid columns={{ initial: '1', sm: '2', lg: '3', xl: '4' }} gap="4" width="100%">
              {Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </Grid>
          ) : (
            <>
              {data && data?.data?.length > 0 ? (
                <Grid columns={{ initial: '1', sm: '2', lg: '3', xl: '4' }} gap="4" width="100%">
                  {data?.data.map((chalet: Chalet, index: number) => (
                    <PropertyCard
                      chalet={chalet}
                      onClick={() => {
                        resetBooking()
                        router.push(`/chalet/${chalet?.id}`)
                      }}
                      key={index}
                    />
                  ))}
                </Grid>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold text-gray-700">No chalets found</h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters or search criteria.
                  </p>
                </div>
              )}

              {data && data?.data?.length > 0 && totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExploreChalets
