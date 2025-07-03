import React from 'react'

import ModalDialog from './ModalDialog/Dialog'
import Button from './Button/Button'
import { Amenity } from '../../types/chalets'
import Image from 'next/image'
import { capitalizeWords } from '@/lib/utils'

type AmenitiesDialogProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  amenities: Amenity[]
}

const AmenitiesDialog: React.FC<AmenitiesDialogProps> = ({ isOpen, setIsOpen, amenities }) => {
  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Amenities"
      className="max-w-2xl lg:max-w-[67%] xl:max-w-[75%] max-h-[90vh] text-[#19191A]"
    >
      <div className="mb-4">
        <p className="text-[#484A4C]">Everything you need for a comfortable stay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {amenities?.map((amenity, index) => {
          return (
            <div key={index} className="flex items-center gap-3">
              <Image src={amenity?.iconPhotoUrl || ''} width={20} height={12} alt={amenity?.title ?? 'Amenity icon'} />
              <span>{capitalizeWords(amenity.title)}</span>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4">
        <Button onClick={() => setIsOpen(false)} intent="ghost" className="w-full">
          Back to Chalet Details
        </Button>
      </div>
    </ModalDialog>
  )
}

export default AmenitiesDialog
