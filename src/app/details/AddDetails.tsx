'use client'
import { Button, Checkbox } from '@radix-ui/themes'
import React, { useState } from 'react'

const services = [
  {
    title: 'Luxury',
    items: [
      'BBQ setup with private chef',
      'Swimming pool presentation',
      'Flower Arrangement',
      'Birthday Setup',
      'Anniversary Setup',
    ],
  },
  {
    title: 'Essentials',
    items: ['Towels', 'Tissues', 'Cleaning Services', 'WiFi', 'Extra Water', 'Others'],
  },
  {
    title: 'Kids',
    items: ['Pool Floaties/Toys', 'Personal Swimming Trainer', 'Baby Bed'],
  },
]

const prices = 30

export default function AddDetails() {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  return (
    <div className="max-w-7xl mx-auto lg:px-22 md:px-18 px-12 py-10">
      <h2 className="text-[39px] leading-[47px] font-semibold text-[#19191A] flex items-center">
        Customize Your Stay
      </h2>

      <p className="text-[20px] py-5 leading-6 font-normal text-[#484A4C] flex items-center">
        Add optional services or extras to make your experience more special.
      </p>

      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        <div className="flex flex-col items-start gap-[40px] w-[463px] h-[975px]">
          {services.map((section) => (
            <div key={section.title} className="w-full">
              <h2 className="text-xl pb-4 leading-6 font-bold text-[#19191A] flex items-center">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item} className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <label htmlFor={item} className="text-sm">
                        {item}{' '}
                        {(item.includes('Birthday') || item.includes('Anniversary')) && (
                          <span className="text-blue-500 text-xs ml-1">Requires 24h Notice</span>
                        )}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{prices} KWD</span>
                      <Checkbox
                        id={item}
                        checked={selected.includes(item)}
                        onCheckedChange={() => handleToggle(item)}
                        className="w-4 h-4 border rounded"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <textarea
            className="w-full h-52 p-3 bg-[#F9FAFB] rounded resize-none text-sm"
            placeholder="Let us know if you need anything specific..."
          />
          <div className="flex gap-4">
            <button className="cursor-pointer bg-[#F3F4F6] text-[#19191A] py-2 rounded-lg text-sm font-medium w-[150px]">
              Skip For Now
            </button>
            <button className="cursor-pointer bg-[#29397E] text-white py-2 rounded-lg text-sm font-medium w-[170px]">
              Add For Booking
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[24px] w-[370px] h-[242px] bg-[#F9FAFB] p-6 rounded">
          <h3 className="text-[25px] leading-8 font-semibold text-[#19191A] flex items-center">
            Add-Ons
          </h3>
          <p className="text-sm leading-4 font-normal text-[#9EA0A2]">
            Selected add-ons will be added to your total booking payment.
          </p>
          <ul className="space-y-2 w-full text-sm">
            {selected.map((item) => (
              <li key={item} className="flex justify-between">
                <span>{item}</span>
                <span>{prices} KWD</span>
              </li>
            ))}
          </ul>
          <div className="border-t w-full pt-4 mt-2 flex justify-between font-semibold text-sm">
            <span>Total</span>
            <span>{selected.length * prices} KWD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
