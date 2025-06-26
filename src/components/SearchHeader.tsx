'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Popover, Text, Box, Separator } from '@radix-ui/themes'
import { fields } from '@/lib/constant'
import { Button } from '@/components'
import { Calendar } from 'react-date-range'

const locations = ['New York', 'London', 'Paris', 'Dubai', 'Tokyo']

const LocationDropdown = () => (
  <Box className="space-y-2">
    {locations.map((loc, idx) => (
      <Text key={idx} as="p" className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
        {loc}
      </Text>
    ))}
  </Box>
)

const CalendarMock = () => <Calendar />

const SearchHeader = () => {
  const quantity = 1
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
  }
  return (
    <div className="flex flex-col md:flex-row items-center p-2.5 gap-7 bg-[#F9FAFB] md:rounded-full rounded-xl w-auto md:w-full mx-2">
      <div className="grid grid-cols-2 gap-3 w-full md:flex md:flex-row md:gap-0 md:divide-x divide-[#E5E7EB] justify-between">
        {fields.map((field, index) => (
          <Popover.Root key={index}>
            <Popover.Trigger>
              <button
                className={`flex flex-col text-left px-0 md:px-4 w-full md:w-auto cursor-pointer ${index === 0 ? 'lg:w-[30%]' : 'lg:w-[20%]'}`}
              >
                <span className="text-[12px] font-bold text-primary">{field.label}</span>
                <span className="text-sm text-secondary">{field.placeholder}</span>
              </button>
            </Popover.Trigger>
            <Popover.Content
              align="start"
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50"
            >
              {field.label === 'Location' ? (
                <LocationDropdown />
              ) : field.label === 'Check in' ? (
                <CalendarMock />
              ) : field.label === 'Check out' ? (
                <CalendarMock />
              ) : (
                <div className="flex items-center gap-2 relative">
                  <div>
                    <div className="font-medium">Guests</div>
                    <div className="text-sm text-gray-500">Adults and children</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="flex cursor-pointer w-8 h-8 justify-center items-center relative p-[6.4px] rounded-[80px] border-[0.8px] border-solid border-[#E5E5EA]"
                      aria-label="Decrease quantity"
                      type="button"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M14.7997 10H5.19971"
                          stroke="#19191A"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="text-[#19191A] text-base font-medium leading-6">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="cursor-pointer flex w-8 h-8 justify-center items-center relative p-[6.4px] rounded-[80px] border-[0.8px] border-solid border-[#E5E5EA]"
                      aria-label="Increase quantity"
                      type="button"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10.0002 5.19995V9.99995M10.0002 9.99995V14.8M10.0002 9.99995H14.8002M10.0002 9.99995L5.2002 9.99995"
                          stroke="#19191A"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </Popover.Content>
          </Popover.Root>
        ))}
      </div>

      <Button className="w-full md:min-w-[48px] md:min-h-[48px] sm:w-14 sm:h-14 cursor-pointer bg-[#29397E] !rounded-full flex items-center justify-center hover:bg-blue-900 transition">
        <Search className="text-white min-w-[20px] min-h-[20px] rounded-full" />
      </Button>
    </div>
  )
}

export default SearchHeader
