import React from 'react'
import { Search } from 'lucide-react'
import { fields } from '@/lib/utils'

const SearchHeader = () => {
  return (
    <div className="flex flex-wrap items-center px-10 py-8 gap-7 bg-[#F9FAFB] md:rounded-full rounded-xl w-full mx-2">
      <div className="flex md:flex-row flex-col flex-1 items-center justify-between md:divide-x md:gap-0 gap-3 divide-[#E5E7EB]">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col px-4 w-full">
            <span className="text-sm font-semibold text-secondary">{field.label}</span>
            <span className="text-sm text-secondary">{field.placeholder}</span>
          </div>
        ))}
      </div>

      <button className="min-w-10 min-h-10 cursor-pointer bg-[#29397E] rounded-full flex items-center justify-center hover:bg-blue-900 transition">
        <Search className="text-white w-4 h-4" />
      </button>
    </div>
  )
}

export default SearchHeader
