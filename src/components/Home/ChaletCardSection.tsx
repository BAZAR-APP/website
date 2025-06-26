'use client'

import { PropertyCard } from '@/components'
import { useEffect, useState } from 'react'
import { useChaletFiltersStore } from '../../../stores/useChaletFiltersStore'
import { useChaletsQuery } from '@/lib/hooks/api/useChaletsQuery'
import { Chalet } from '../../../types/chalets'

interface ChaletsCardProps {
  title: string
}

const ChaletsCard: React.FC<ChaletsCardProps> = ({ title }) => {
  const [mount, setMount] = useState(false)
  const { setFilters } = useChaletFiltersStore()

  useEffect(() => {
    setFilters({ viewType: ['sea view'] })
    setMount(true)
  }, [setFilters])

  const { data } = useChaletsQuery(mount)
  return (
    <section className="flex w-full flex-col items-center box-border bg-white gap-24 px-0 py-0 max-md:gap-16 max-md:py-16 max-sm:gap-12 max-sm:py-8">
      <div className="flex flex-col items-start gap-12 w-full ">
        <h1 className="w-full text-black text-[32px] md:text-[39px] font-semibold">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {data &&
            data?.data?.length > 0 &&
            data?.data?.map((chalet: Chalet, index: number) => (
              <PropertyCard chalet={chalet} onClick={() => {}} key={index} isMember={true} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default ChaletsCard
