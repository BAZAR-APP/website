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
  member?: boolean
  newPrice?: number
}

const PropertyCard: React.FC<PropertyCardProps> = ({
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
  onClick,
  member = false,
  newPrice,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-full max-w-[350px] p-4 gap-4 bg-[#F9FAFB] cursor-pointer rounded-[16px] mx-auto"
    >
      <div className="w-full h-[184px]">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-[12px]"
          width={400}
          height={300}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1 justify-between">
          <h3 className="sm:text-xl text-lg font-normal text-[#484A4C]">{title}</h3>
          <button aria-label="Add to favorites">
            <Heart className="w-5 h-5 text-[#29397E]" />
          </button>
        </div>

        <div className="flex flex-wrap items-center text-sm text-[#8E8E93] gap-x-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
          {member && (
            <div className="flex items-center text-sm text-gray-700 ml-auto">
              <span className="ml-1">{rating}</span>
              <Image src={Star} alt="Star" width={16} height={16} />
              <span className="text-gray-500 ml-1">({reviews} reviews)</span>
            </div>
          )}
        </div>

        <div className="text-sm text-[#8E8E93] leading-5">
          {guests} <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          Home <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          {beds} <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          {baths}
          <br />
          {amenities.map((amenity, index) => (
            <span key={index} className="text-[#8E8E93] text-sm font-normal">
              {amenity}
              {index < amenities.length - 1 && (
                <span className="mx-1 text-[#9EA0A2] font-normal text-[9px]">&bull;</span>
              )}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {!member && (
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-1">{rating}</span>
              <Image src={Star} alt="Star" width={16} height={16} />
              <span className="text-gray-500 ml-1">({reviews} reviews)</span>
            </div>
          )}

          <div className="flex items-center gap-2 font-medium text-[16px] leading-7 text-[#484A4C]">
            {newPrice ? (
              <>
                <span>{newPrice} KD</span>
                <span className="text-sm leading-4 font-normal text-[#484A4C]">/{priceUnit}</span>
                <span className="text-[12px] leading-4 font-medium line-through text-[#484A4C]">
                  {price} KD
                </span>
              </>
            ) : (
              <>
                <span className="sm:text-[18px] text-sm">{price} KD</span>
                <span className="text-sm leading-4 font-normal text-[#484A4C]">/{priceUnit}</span>
              </>
            )}
          </div>

          {member && (
            <div className="flex w-[113px] pt-[4px] pr-[6px] pb-[4px] pl-[6px] gap-[2px] justify-center items-center shrink-0 flex-nowrap bg-[#29397e] rounded-[6px] relative z-[29]">
              <div className="w-[16px] h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/7tnhNOS6C5.png)] bg-cover bg-no-repeat relative overflow-hidden z-30" />
              <span className="flex w-[83px] h-[15px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[12px] font-normal leading-[14.523px] text-[#fdfdfe] relative text-center whitespace-nowrap z-[31]">
                Members Only
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
