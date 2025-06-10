'use client'
import FilterSidebar from '@/components/FilterSidebar'
import Pagination from '@/components/Pagination'
import { PropertyCard } from '@/components'
import SearchHeader from '@/components/SearchHeader'
import SearchResults from '@/components/SearchResults'
import { mockProperties } from '@/lib/constant'
import { Grid, Heading } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ExploreChalets = () => {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('recommended')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const totalPages = Math.ceil(mockProperties.length / itemsPerPage)
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
            totalResults={2555}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <Grid columns={{ initial: '1', sm: '2', lg: '3', xl: '4' }} gap="4" width="100%">
            {mockProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onClick={() => router.push(`/explore/chalets/${property.id}`)}
              />
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default ExploreChalets
