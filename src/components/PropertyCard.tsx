import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Star from '../../public/images/Like.svg'
import React from 'react'

interface PropertyCardProps {
  title: string
  location: string
  guests: string
  beds: string
  baths: string
  amenities: string[]
  rating: number
  reviews: number
  price: number
  priceUnit: 'night' | 'hour'
  imageUrl: string
  onClick?: () => void
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  location,
  guests,
  beds,
  baths,
  amenities,
  rating,
  reviews,
  price,
  priceUnit,
  imageUrl,
  onClick
}) => {
  return (
    <div onClick={onClick} className="flex flex-col lg:w-[300px] w-full p-3 gap-5 bg-[#F9FAFB] cursor-pointer rounded-[16px] mx-auto">
      <div className="lg:w-[276px] w-full lg:h-[184px] h-[250px]">
        <Image src={imageUrl} alt={title} className="w-full h-full object-cover rounded-[12px]" />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-start justify-between w-full">
          <h3 className="text-xl font-normal text-[#484A4C] leading-6">{title}</h3>
          <button aria-label="Add to favorites">
            <Heart className="w-5 h-5 text-[#29397E]" />
          </button>
        </div>

        <div className="flex items-center text-sm text-[#8E8E93]">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>

        <div className="text-sm text-[#8E8E93] leading-5">
          {guests} • Home • {beds} • {baths}
          <br />
          {amenities.join(' • ')}
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-sm text-gray-700">
            <Image src={Star} alt="Star" width={16} height={16} />
            <span className="ml-1">{rating}</span>
            <span className="text-gray-500 ml-1">({reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-[18px] leading-7 text-[#484A4C]">
            {price} KD
            <span className="text-sm leading-4 font-normal text-[#484A4C]">/{priceUnit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
