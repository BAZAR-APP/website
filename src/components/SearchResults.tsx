'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { sortOptions } from '@/lib/utils'

interface SearchResultsProps {
  location: string
  totalResults: number
  sortBy: string
  onSortChange: (sort: string) => void
}

const SearchResults: React.FC<SearchResultsProps> = ({
  location,
  totalResults,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex sm:flex-row flex-col items-center justify-between md:mx-2 mx-3 my-8">
      <h2 className="md:text-[25px] text-xl leading-[30px] font-normal text-[#19191A] text-center">
        {location}: {totalResults.toLocaleString()} search results found
      </h2>

      <Select.Root value={sortBy} onValueChange={onSortChange}>
        <Select.Trigger className="w-48 inline-flex items-center justify-between bg-[#F9FAFB] cursor-pointer rounded-lg px-4 py-4 text-sm font-medium text-gray-700 focus:outline-none focus:border-none">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[12px] leading-3 font-normal text-[#9EA0A2] flex-none">
              Sort by
            </span>

            <Select.Value className="text-3 leading-3 font-normal text-[#19191A] flex-none order-1" />
          </div>
          <Select.Icon className="ml-2">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
            sideOffset={4}
          >
            <Select.Viewport className="p-1">
              {sortOptions.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 cursor-pointer rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="w-4 h-4 text-[#29397E]" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export default SearchResults
