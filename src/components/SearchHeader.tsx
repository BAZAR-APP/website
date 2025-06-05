import React from 'react'
import { Search } from 'lucide-react'
import Button from './Button/Button'
import { fields } from '@/lib/constant'

const SearchHeader = () => {
  return (
    <div className="flex flex-wrap items-center py-4 gap-7 bg-[#F9FAFB] md:rounded-full rounded-xl px-3 w-auto md:w-full mx-2">
      <div className="flex md:flex-row flex-col flex-1 items-center justify-between md:divide-x md:gap-0 gap-3 divide-[#E5E7EB]">
        {fields.map((field, index) => (
          <div
            key={index}
            className={`flex flex-col px-4 w-full ${index === 0 ? 'lg:w-[35%]' : 'lg:w-[20%]'
              }`}
          >
            <span className="text-[12px] font-bold text-secondary">{field.label}</span>
            <span className="text-sm text-secondary">{field.placeholder}</span>
          </div>
        ))}
      </div>

      <Button className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer bg-[#29397E] !rounded-full flex items-center justify-center hover:bg-blue-900 transition">
        <Search className="text-white min-w-[20px] min-h-[20px] rounded-full" />
      </Button>
    </div>
  )
}

export default SearchHeader
