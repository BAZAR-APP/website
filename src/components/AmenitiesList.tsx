'use client'
import { LucideIcon } from 'lucide-react'
import * as Icons from 'lucide-react'
import Button from './Button/Button'
import AmenitiesDialog from './AmenitiesDialog'
import useToggle from '@/lib/hooks/useToggle'

interface Amenity {
  icon: string
  label: string
}

interface AmenitiesListProps {
  amenities: Amenity[]
}

const AmenitiesList = ({ amenities }: AmenitiesListProps) => {
  const { isOpen, toggle } = useToggle(false)

  return (
    <>
      <div className="text-[#19191A]">
        <h2 className="text-xl font-semibold mb-6">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 font-medium">
          {amenities.map((amenity, index) => {
            const IconComponent = Icons[amenity.icon as keyof typeof Icons] as LucideIcon

            return (
              <div key={index} className="flex items-center gap-3">
                {IconComponent && <IconComponent className="w-5 h-5 text-gray-600" />}
                <span>{amenity.label}</span>
              </div>
            )
          })}
        </div>
        <Button onClick={toggle} intent="transperent" className="border border-[#19191A] sm:w-[200px] w-full">
          Show all Amenities
        </Button>
      </div>
      <AmenitiesDialog isOpen={isOpen} setIsOpen={toggle} />
    </>
  )
}

export default AmenitiesList
