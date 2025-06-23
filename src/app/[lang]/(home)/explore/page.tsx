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
  const { data, isLoading } = useChaletsQuery()
  const { page, setFilters } = useChaletFiltersStore()
  const totalPages = Math.ceil((data?.total || 0) / (data?.limit || 0))

  const handlePageChange = (newPage: number) => {
    setFilters({ page: newPage })
  }
  const { resetBooking } = useBookingStore()
  return (
    <div className="min-h-screen lg:px-14 md:px-12 px-10 xxl-p mx-auto">
      <h2 className="font-semibold md:text-[39px] sm:text-2xl text-xl leading-11 text-[#19191A] pt-5">
        Explore Chalets
      </h2>

      <div className="flex lg:flex-row flex-col py-6 xxl-gap">
        <FilterSidebar />
        <div className="">
          <SearchHeader />
          <SearchResults
            location="Al Khobar"
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
              <Grid columns={{ initial: '1', sm: '2', lg: '3', xl: '4' }} gap="4" width="100%">
                {data &&
                  data?.data.length &&
                  data?.data?.map((chalet: Chalet, index: number) => (
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
