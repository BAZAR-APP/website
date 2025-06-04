import React from 'react'
import FilterSection from './FilterSection'
import Image from 'next/image'
import Like from '../../public/images/Like.svg'
import Checkbox from './CheckBox/CheckBox'
import { Slider } from 'radix-ui'
import { amenities, locations } from '@/lib/constant'

const FilterSidebar = () => {
  const [value, setValue] = React.useState(50)

  return (
    <div className="lg:w-80 w-full md:px-6 px-3 py-5 h-full overflow-y-auto w-500px-1440 xl:mr-3 mr-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="!sm:text-2xl !text-xl leading-8 font-semibold text-[#1F2937]">Filter By</h3>
        <button className="text-[#29397E] text-base leading-6 font-normal cursor-pointer">
          Reset
        </button>
      </div>

      <FilterSection title="Location">
        {locations.map((location) => (
          <Checkbox key={location} label={location} className="text-sm text-gray-700" />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        <div className="mt-5 w-full">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            min={0}
            max={100}
            step={1}
            value={[value]}
            onValueChange={([val]) => setValue(val)}
          >
            <Slider.Track className="bg-[#E5E7EB] relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-[#29397E] h-2 rounded-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-[22px] h-[22px] bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none"
              aria-label="Price range"
            />
          </Slider.Root>
          <div className="flex z-10 gap-10 justify-between items-start p-0 mt-3 mb-0 text-sm font-medium text-center text-[#4B5563] max-md:mb-2.5">
            <span className="leading-none">0 KD</span>
            <span className="leading-none">3000 KD</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Amenities">
        {amenities.map((amenity) => (
          <Checkbox key={amenity} label={amenity} className="text-sm text-gray-700" />
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
