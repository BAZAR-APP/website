import { LucideIcon } from 'lucide-react'
import * as Icons from 'lucide-react'

interface Amenity {
  icon: string
  label: string
}

interface AmenitiesListProps {
  amenities: Amenity[]
}

const AmenitiesList = ({ amenities }: AmenitiesListProps) => {
  return (
    <div className="border-b border-[#E5E7EB] pb-8 text-[#19191A]">
      <h2 className="text-xl font-semibold mb-6">Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  )
}

export default AmenitiesList
