import React from 'react'
import {
  Wifi,
  Tv,
  Refrigerator,
  ChefHat,
  WashingMachine,
  Zap,
  Car,
  Coffee,
  Utensils,
  Shield,
} from 'lucide-react'
import ModalDialog from './ModalDialog/Dialog'
import Button from './Button/Button'

type AmenitiesDialogProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const AmenitiesDialog: React.FC<AmenitiesDialogProps> = ({ isOpen, setIsOpen }) => {
  const amenities = [
    { icon: ChefHat, label: 'Kitchen' },
    { icon: Wifi, label: 'Garden view' },
    { icon: Wifi, label: 'Private Pool' },
    { icon: Wifi, label: 'Free Wifi' },
    { icon: Zap, label: 'Dryer' },
    { icon: WashingMachine, label: 'Free washer - in building' },
    { icon: Wifi, label: 'Clean Towels' },
    { icon: Wifi, label: 'Central air conditioning' },
    { icon: Tv, label: 'TV streaming services' },
    { icon: Refrigerator, label: 'Refrigerator' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Wifi, label: 'Sea View' },
    { icon: Wifi, label: 'Left Elevator' },
    { icon: Refrigerator, label: 'Fridge' },
    { icon: Wifi, label: 'Outdoor Sitting Area' },
    { icon: WashingMachine, label: 'Washing Machine' },
    { icon: Wifi, label: 'Kids Play Area' },
    { icon: Wifi, label: 'Cinema Room' },
    { icon: Wifi, label: 'Bicycles' },
    { icon: Wifi, label: 'Gym' },
    { icon: Wifi, label: 'Fully Furnished' },
    { icon: Wifi, label: 'Luggage Pick-up & Drop' },
    { icon: Wifi, label: 'Cleaning Services' },
    { icon: Wifi, label: 'Room Housekeeping' },
    { icon: Coffee, label: 'Mini Bar / Drinks' },
    { icon: Wifi, label: 'Airport Pickup' },
    { icon: Wifi, label: 'Concierge' },
    { icon: Wifi, label: 'Baby Bed' },
    { icon: Wifi, label: 'Towel and Tissue' },
    { icon: Utensils, label: 'Restaurant' },
    { icon: Wifi, label: 'Complimentary Gift' },
    { icon: Shield, label: 'CCTV' },
    { icon: Wifi, label: 'BBQ Tools' },
    { icon: Wifi, label: 'Projector Outdoors' },
    { icon: ChefHat, label: 'Fully Equipped Kitchen' },
    { icon: Wifi, label: 'Swimming Pool Outdoors' },
    { icon: Wifi, label: 'Fountain and Garden' },
    { icon: Coffee, label: 'Coffee Corner' },
    { icon: Wifi, label: 'Iron' },
    { icon: Car, label: 'Parking Lot' },
    { icon: Wifi, label: 'Soap / Handwash' },
    { icon: Zap, label: 'Hair Dryer' },
    { icon: Wifi, label: 'Kayak' },
    { icon: Wifi, label: 'Balcony / Terrace' },
  ]

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
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3 py-2">
            <amenity.icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{amenity.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4">
        <Button
          onClick={() => setIsOpen(false)}
          intent='ghost'
          className='w-full'
        >
          Back to Chalet Details
        </Button>
      </div>
    </ModalDialog>
  )
}

export default AmenitiesDialog
