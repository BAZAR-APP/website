import React from 'react'
import FilterSection from './FilterSection'
import { amenities, locations } from '@/lib/utils'
import Image from 'next/image'
import Like from '../../public/images/Like.svg'

const CheckboxItem = ({ label }: { label: string }) => (
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
)

const FilterSidebar = () => {
  const [value, setValue] = React.useState(50)

  return (
    <div className="lg:w-80 w-full p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl leading-8 font-semibold text-[#1F2937]">Filter By</h3>
        <button className="text-[#29397E] text-base leading-6 font-normal cursor-pointer">
          Reset
        </button>
      </div>

      <FilterSection title="Location">
        {locations.map((location) => (
          <CheckboxItem key={location} label={location} />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        <div className="mt-5 w-full">
          <div className="w-full relative">
            <div className="relative w-full h-2 bg-[#E5E7EB] rounded-full">
              <div
                className="absolute h-2 bg-[#29397E] rounded"
                style={{ width: `${(value / 100) * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="absolute w-full h-2 opacity-0 cursor-pointer"
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[22px] h-[22px] bg-white rounded-full border border-gray-200 shadow-sm"
                style={{ left: `${(value / 100) * 100}%` }}
              />
            </div>
            <div className="flex z-10 gap-10 justify-between items-start p-0 mt-3 mb-0 text-sm font-medium text-center text-[#4B5563] max-md:mb-2.5">
              <span className="leading-none">0 KD</span>
              <span className="leading-none">3000 KD</span>
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Amenities">
        {amenities.map((amenity) => (
          <CheckboxItem key={amenity} label={amenity} />
        ))}
      </FilterSection>

      <FilterSection title="Rating">
        <div className="flex items-center justify-between rounded-xl px-2 bg-[#F9FAFB]">
          {[1, 2, 3, 4, 5].map((rating, index) => (
            <div
              key={rating}
              className={`h-16 w-full flex items-center justify-center ${index !== 4 ? 'border-r border-[#F2F2F7]' : ''}`}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700">{rating}</span>
                <span>
                  <Image src={Like} alt="Unlike" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )
}

export default FilterSidebar
