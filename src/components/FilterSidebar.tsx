import React, { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import FilterSection from './FilterSection'
import Image from 'next/image'
import Like from '../../public/images/Like.svg'
import Checkbox from './CheckBox/CheckBox'
import { Slider } from 'radix-ui'

import { locations } from '@/lib/constant'
import { useChaletFiltersStore } from '../../stores/useChaletFiltersStore'
import { useQueryBase } from '@/lib/axios'
import { Amenity } from '../../types/chalets'

const FilterSidebar = () => {
  const { setFilters, city, amenities, resetFilters, minPrice, maxPrice } = useChaletFiltersStore()
  const { data } = useQueryBase({
    queryKey: ['amenities', 1],
    url: `/amenity?language=en&limit=10&page=1`,
    cacheTime: 0,
    staleTime: 0,
  })
  const amenitiesList = Array.isArray(data?.data?.data)
    ? data.data.data.map((item: Amenity) => ({
        label: item.title,
        value: item.id,
      }))
    : []

  const [currentRange, setCurrentRange] = useState([minPrice, maxPrice])

  useEffect(() => {
    setCurrentRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const debouncedSetFilters = useCallback(
    debounce((values) => {
      setFilters({
        minPrice: values[0],
        maxPrice: values[1],
      })
    }, 500),
    [setFilters],
  )

  const handleRangeChange = (values: any) => {
    setCurrentRange(values)
    debouncedSetFilters(values)
  }

  useEffect(() => {
    return () => {
      debouncedSetFilters.cancel()
    }
  }, [debouncedSetFilters])

  return (
    <div className="lg:w-80 w-full py-5 h-full overflow-y-auto w-500px-1440 xl:mr-3 mr-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="sm:text-[25px] text-lg leading-8 font-semibold text-[#1F2937]">Filter By</h3>
        <button
          className="text-[#29397E] text-base leading-6 font-normal cursor-pointer"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>

      <FilterSection title="Location">
        <div className="flex flex-col gap-1.5">
          {locations.map((location) => (
            <Checkbox
              key={location}
              label={location}
              className="text-sm text-gray-700 !cursor-pointer"
              checked={city.includes(location)}
              onChange={(checked) => {
                const updated = checked ? [...city, location] : city.filter((c) => c !== location)
                setFilters({ city: updated })
              }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="mt-5 w-full">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            min={1}
            max={3000}
            step={1}
            value={currentRange}
            onValueChange={handleRangeChange}
          >
            <Slider.Track className="bg-[#E5E7EB] relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-[#29397E] h-2 rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              className="cursor-pointer block w-[22px] h-[22px] bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none"
              aria-label="Minimum price"
            />
            <Slider.Thumb
              className="cursor-pointer block w-[22px] h-[22px] bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none"
              aria-label="Maximum price"
            />
          </Slider.Root>
          <div className="flex z-10 gap-10 justify-between items-start p-0 mt-3 mb-0 text-sm font-medium text-center text-[#4B5563] max-md:mb-2.5">
            <span className="leading-none">{currentRange?.[0]} KD</span>
            <span className="leading-none">{currentRange?.[1]} KD</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Amenities">
        <div className="flex flex-col gap-1.5">
          {amenitiesList?.map((amenity: { label: string; value: string }) => (
            <Checkbox
              key={amenity?.value}
              label={amenity?.label}
              className="text-sm text-gray-700 cursor-pointer"
              checked={amenities.includes(amenity?.value)}
              onChange={(checked) => {
                const updated = checked
                  ? [...amenities, amenity?.value]
                  : amenities.filter((c) => c !== amenity?.value)

                setFilters({ amenities: updated })
              }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="flex items-center justify-between rounded-[8px] px-0.5 bg-[#F9FAFB]">
          {[1, 2, 3, 4, 5].map((rating) => (
            <div
              key={rating}
              // onClick={() => setFilters({ rating })}
              className="cursor-pointer h-12 w-full flex items-center justify-center border-r border-[#F2F2F7] last:border-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-700">{rating}</span>
                <Image src={Like} alt="Like" />
              </div>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

export default FilterSidebar
