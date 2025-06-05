import React from 'react'
import { Search } from 'lucide-react'
import Button from './Button/Button'
import { fields } from '@/lib/constant'

const SearchHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center py-4 gap-7 bg-[#F9FAFB] md:rounded-full rounded-xl px-3 w-auto md:w-full mx-2">
      <div className="grid grid-cols-2 gap-3 w-full md:flex md:flex-row md:gap-0 md:divide-x divide-[#E5E7EB] md:justify-between">
        {fields.map((field, index) => (
          <div
            key={index}
            className={`flex flex-col px-4 w-full md:w-auto ${index === 0 ? 'lg:w-[30%]' : 'lg:w-[20%]'
              }`}
          >
            <span className="text-[12px] font-bold text-primary">{field.label}</span>
            <span className="text-sm text-secondary">{field.placeholder}</span>
          </div>
        ))}
      </div>


      <Button className="w-full md:w-10 md:h-10 sm:w-12 sm:h-12 cursor-pointer bg-[#29397E] !rounded-full flex items-center justify-center hover:bg-blue-900 transition">
        <Search className="text-white min-w-[20px] min-h-[20px] rounded-full" />
      </Button>
    </div>

  )
}

export default SearchHeader
