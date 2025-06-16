import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Star from '../../public/images/Like.svg'
import React from 'react'
import { Chalet } from '../../types/chalets'

interface PropertyCardProps {
  onClick?: () => void
  chalet: Chalet
}

const PropertyCard: React.FC<PropertyCardProps> = ({ onClick, chalet }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-full max-w-[350px] p-4 gap-4 bg-[#F9FAFB] cursor-pointer rounded-[16px] mx-auto"
    >
      <div className="w-full h-[184px]">
        <Image
          src={chalet?.photoId}
          alt={chalet?.title}
          className="w-full h-full object-cover rounded-[12px]"
          width={400}
          height={300}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1 justify-between">
          <h3 className="sm:text-xl text-lg font-normal text-[#484A4C]">{chalet?.title}</h3>
          <button aria-label="Add to favorites">
            <Heart className="w-5 h-5 text-[#29397E]" />
          </button>
        </div>

        <div className="flex flex-wrap items-center text-sm text-[#8E8E93] gap-x-2">
          <MapPin className="w-4 h-4" />
          <span>{chalet?.city}</span>
          {/* {member && (
            <div className="flex gap-1 items-center text-sm text-gray-700 ml-auto">
              <span className="ml-2">{rating}</span>
              <Image src={Star} alt="Star" width={16} height={16} />
              <span className="text-[#484A4C] ml-1">({reviews} reviews)</span>
            </div>
          )} */}
        </div>

        <div className="text-sm text-[#8E8E93] leading-5">
          {chalet?.maxNoOfGuests}{' '}
          <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          Home <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          {chalet?.maxNoOfBeds}{' '}
          <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          {chalet?.noOfBaths}
          <br />
          {/* {chalet?.amenities.map((amenity, index) => (
            <span key={index} className="text-[#8E8E93] text-sm font-normal">
              {amenity}
              {index < amenities.length - 1 && (
                <span className="mx-1 text-[#9EA0A2] font-normal text-[9px]">&bull;</span>
              )}
            </span>
          ))} */}
        </div>
        <div className="flex items-center justify-between flex-nowrap">
          <div className="flex items-center justify-between ">
            {/* {!member && (
              <div className="flex items-center sm:flex-nowrap flex-wrap text-sm text-gray-700">
                <span className="mr-1">{rating}</span>
                <Image src={Star} alt="Star" width={16} height={16} />
                <span className="text-gray-500 sm:ml-1">({reviews} reviews)</span>
              </div>
            )} */}

            <div className="flex items-center font-medium text-[16px] leading-7 text-[#484A4C]">
              {chalet?.perHourCost ? (
                <>
                  <span className="md:text-[14px] text-[12px] font-bold text-primary">
                    {chalet?.perHourCost} KD
                  </span>
                  <span className="md:text-[12px] text-[10px] leading-4 font-normal text-primary">
                    /{chalet?.perHourCost}
                  </span>
                  <span className="pl-2 md:text-[12px] text-[10px] font-overline leading-4 font-bold line-through text-primary">
                    {chalet?.perHourCost} KD
                  </span>
                </>
              ) : (
                <>
                  <span className="sm:text-[18px] text-sm">{chalet?.perHourCost} KD</span>
                  <span className="text-sm leading-4 font-normal text-[#484A4C]">
                    /{chalet?.perHourCost}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* {member && (
            <div className="flex w-[113px] py-[4px] px-[6px] gap-[4px] justify-center items-center bg-[#29397e] rounded-[6px] relative z-[29]">
              <div className="w-[12px] h-[12px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/7tnhNOS6C5.png)] bg-cover bg-no-repeat relative z-30" />
              <span className="text-[12px] font-normal text-[#fdfdfe] text-center whitespace-nowrap z-31">
                Members Only
              </span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
