import { AddOns } from '@/components/Booking/add-ons/AddOns'
import Button from '@/components/Button/Button'
import { fetcher } from '@/lib/axios'
import { AddOnItem, Customization, GroupedCustomization } from '@/lib/types/booking'
import { useQuery } from '@tanstack/react-query'

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
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

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

type CustomizeStayProps = {
  onNext: () => void
}
export default function CustomizeStay({ onNext }: CustomizeStayProps) {
  const { watch, setValue } = useFormContext()
  const selectedAddons: Customization[] = watch('addons') || []
  const itemIconMap: Record<string, React.ReactNode> = {}
  services.forEach((section) => {
    section.items.forEach((item) => {
      itemIconMap[item.name] = item.icon
    })
  })
  const total = selectedAddons.reduce((acc, item) => {
    const qty = item.selectedQuantity ?? 0
    return acc + item.costPerNight * +qty
  }, 0)

  return (
    <div className="max-w-[1800px] mx-auto lg:px-22 md:px-18 sm:px-12 px-8 py-10">
      <h2 className="lg:text-[39px] md:text-2xl text-xl lg:leading-[47px] leading-7 font-semibold text-[#19191A] flex items-center">
        Customize Your Stay
      </h2>

      <p className="lg:text-[20px] text-lg py-4 lg:leading-6 leading-4 font-normal text-[#484A4C] flex items-center">
        Add optional services or extras to make your experience more special.
      </p>

      <div className="flex flex-col lg:flex-row gap-10 justify-between">
        <div className="flex flex-col items-start gap-[40px] md:w-[463px] w-full">
          <AddOns />

          <textarea
            className="md:w-[370px] w-full h-52 p-3 bg-[#F9FAFB] focus:border-none focus:outline-none rounded resize-none text-sm"
            placeholder="Let us know if you need anything specific..."
          />
        </div>

        <div className="flex flex-col items-start gap-[24px] lg:w-[370px] w-full h-fit bg-[#F9FAFB] p-6 rounded">
          <h3 className="text-[25px] leading-8 font-semibold text-[#19191A] flex items-center">
            Add-Ons
          </h3>
          <p className="text-sm leading-4 font-normal text-[#9EA0A2]">
            Selected add-ons will be added to your total booking payment.
          </p>
          <ul className="space-y-2 w-full text-sm">
            {selectedAddons.map((item, index) => (
              <li key={item?.title + index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {item?.iconPhotoUrl && (
                    <Image src={item?.iconPhotoUrl ?? ''} width={16} height={16} alt="icon" />
                  )}
                  <span>{item?.title}</span>
                </div>
                <span>{item?.costPerNight * (Number(item?.selectedQuantity) ?? 1)} KWD</span>
              </li>
            ))}
          </ul>
          <div className="border-t w-full pt-4 mt-2 flex justify-between font-medium text-sm sm:text-[16px]">
            <span>Total</span>
            <span>{total} KWD</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 border-t border-[#E5E7EB] pt-7 mt-6">
        <Button
          intent="ghost"
          className="text-[#19191A] py-2 rounded-lg text-sm font-medium w-[150px]"
        >
          Skip For Now
        </Button>
        <Button
          onClick={() => {
            setValue('selectedAddonsTotal', total)
            onNext()
          }}
          className="cursor-pointer bg-[#29397E] text-white py-2 rounded-lg text-sm font-medium w-[170px]"
        >
          Add For Booking
        </Button>
      </div>
    </div>
  )
}
