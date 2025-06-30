'use client'
import Button from './Button/Button'
import AmenitiesDialog from './AmenitiesDialog'
import useToggle from '@/lib/hooks/useToggle'
import { Amenity } from '../../types/chalets'
import Image from 'next/image'
import { capitalizeWords } from '@/lib/utils'

interface AmenitiesListProps {
  amenities: Amenity[]
}

const AmenitiesList = ({ amenities }: AmenitiesListProps) => {
  const { isOpen, toggle } = useToggle(false)

  return (
    <>
      <div className="text-[#19191A]">
        <h2 className="md:text-[25px] text-xl font-semibold mb-6">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
          {amenities?.map((amenity, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                {amenity?.iconPhotoId && (
                  <Image src={amenity?.iconPhotoId} width={20} height={12} alt={amenity?.title} />
                )}
                <span>{capitalizeWords(amenity.title)}</span>
              </div>
            )
          })}
        </div>
        <Button
          onClick={toggle}
          intent="transperent"
          size="sm"
          className="cursor-pointer border border-[#19191A] text-sm font-medium sm:max-w-[170px] w-full "
        >
          Show all Amenities
        </Button>
      </div>
      <AmenitiesDialog isOpen={isOpen} setIsOpen={toggle} amenities={amenities} />
    </>
  )
}

export default AmenitiesList
