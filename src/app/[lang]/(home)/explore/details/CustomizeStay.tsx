import { AddOns } from '@/components/Booking/add-ons/AddOns'
import Button from '@/components/Button/Button'
import Checkbox from '@/components/CheckBox/CheckBox'

import {
  PartyPopper,
  Flame,
  Flower,
  Cake,
  Heart,
  Bath,
  Wifi,
  Droplets,
  MoreHorizontal,
  Baby,
  ToyBrick,
  Clapperboard,
  SwordIcon,
} from 'lucide-react'
import React, { useState } from 'react'

const services = [
  {
    title: 'Luxury',
    items: [
      { name: 'BBQ setup with private chef', icon: <Flame size={16} /> },
      { name: 'Swimming pool presentation', icon: <Droplets size={16} /> },
      { name: 'Flower Arrangement', icon: <Flower size={16} /> },
      { name: 'Birthday Setup', icon: <Cake size={16} /> },
      { name: 'Anniversary Setup', icon: <Heart size={16} /> },
    ],
  },
  {
    title: 'Essentials',
    items: [
      { name: 'Towels', icon: <Bath size={16} /> },
      { name: 'Tissues', icon: <PartyPopper size={16} /> },
      { name: 'Cleaning Services', icon: <Clapperboard size={16} /> },
      { name: 'WiFi', icon: <Wifi size={16} /> },
      { name: 'Extra Water', icon: <Droplets size={16} /> },
      { name: 'Others', icon: <MoreHorizontal size={16} /> },
    ],
  },
  {
    title: 'Kids',
    items: [
      { name: 'Pool Floaties/Toys', icon: <ToyBrick size={16} /> },
      { name: 'Personal Swimming Trainer', icon: <SwordIcon size={16} /> },
      { name: 'Baby Bed', icon: <Baby size={16} /> },
    ],
  },
]

const prices = 30
type CustomizeStayProps = {
  onNext: () => void
}
export default function CustomizeStay({ onNext }: CustomizeStayProps) {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }
  const itemIconMap: Record<string, React.ReactNode> = {}
  services.forEach((section) => {
    section.items.forEach((item) => {
      itemIconMap[item.name] = item.icon
    })
  })
  return (
    <div className="max-w-7xl mx-auto lg:px-22 md:px-18 px-12 py-10">
      <h2 className="text-[39px] leading-[47px] font-semibold text-[#19191A] flex items-center">
        Customize Your Stay
      </h2>

      <p className="text-[20px] py-5 leading-6 font-normal text-[#484A4C] flex items-center">
        Add optional services or extras to make your experience more special.
      </p>

      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        <div className="flex flex-col items-start gap-[40px] md:w-[463px] w-full">
          <AddOns />

          <textarea
            className="w-full h-52 p-3 bg-[#F9FAFB] rounded resize-none text-sm"
            placeholder="Let us know if you need anything specific..."
          />
          <div className="flex gap-4">
            <Button className="cursor-pointer bg-[#F3F4F6] text-[#19191A] py-2 rounded-lg text-sm font-medium w-[150px]">
              Skip For Now
            </Button>
            <Button
              onClick={() => onNext()}
              className="cursor-pointer bg-[#29397E] text-white py-2 rounded-lg text-sm font-medium w-[170px]"
            >
              Add For Booking
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[24px] md:w-[370px] w-full h-fit bg-[#F9FAFB] p-6 rounded">
          <h3 className="text-[25px] leading-8 font-semibold text-[#19191A] flex items-center">
            Add-Ons
          </h3>
          <p className="text-sm leading-4 font-normal text-[#9EA0A2]">
            Selected add-ons will be added to your total booking payment.
          </p>
          <ul className="space-y-2 w-full text-sm">
            {selected.map((item) => (
              <li key={item} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[#29397E]">{itemIconMap[item]}</span>
                  <span>{item}</span>
                </div>
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
