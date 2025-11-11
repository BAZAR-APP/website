'use client'

import React from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { Locale } from '../../i18n.config'

interface SearchResultsProps {
  location: string[]
  totalResults: number
  sortBy: string
  onSortChange: (sort: string) => void
  lang: Locale
}

const SearchResults: React.FC<SearchResultsProps> = ({
  location,
  totalResults,
  sortBy,
  onSortChange,
  lang
}) => {

  const sortOptions = [
  { value: 'recommended', label: lang === "en" ? "Recommended" : "موصى به" },
  { value: 'price_low', label: lang === "en" ? "Low to High" : "من الأقل إلى الأعلى" },
  { value: 'price_high', label: lang === "en" ? "High to Low" : "من الأعلى إلى الأقل" },
  { value: 'rating', label: lang === "en" ? "Highest Rated" : "الأعلى تقييماً" },
  { value: 'newest', label: lang === "en" ? "Newest" : "الأحدث" },
]

  return (
    <div className="flex sm:flex-row flex-col items-center justify-between my-8 sm:mx-0 mx-1">
      <h2 className="md:text-[25px] sm:text-xl text-[16px] sm:leading-[30px] leading-4 font-normal text-[#19191A] pb-2 sm:pb-0 text-center">
        {location?.length > 0 &&
          location?.join?.(',') + ' : ' + totalResults.toLocaleString() + ' search results found'}
      </h2>

      <Select.Root value={sortBy} onValueChange={onSortChange}>
        <Select.Trigger className="sm:w-[200px] w-full inline-flex items-center justify-between bg-[#F9FAFB] cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:border-none">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[12px] leading-3 font-normal text-[#9EA0A2] flex-none">
              {lang === "en" ? "Sort by" : "ترتيب حسب"}
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
