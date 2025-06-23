'use client'
import Image from 'next/image'
import React from 'react'
import { ChaletBedroom } from '../../types/chalets'
import { useBookingStore } from '../../stores/useBookingStore'

type BedroomCardProps = {
  room: ChaletBedroom
  className?: string
}

const BedroomCard: React.FC<BedroomCardProps> = ({ className = '', room }) => {
  const { setRoom } = useBookingStore()

  return (
    <>
      <div
        className={`bg-white border border-[#E5E5EA] rounded-[20px] py-3 px-4 flex flex-col items-start text-center space-y-2.5 hover:shadow-md transition-shadow cursor-pointer min-w-[120px] ${className}`}
        onClick={() => setRoom(room)}
      >
        <div className="flex items-center justify-center">
          {true ? (
            <Image src={'/images/Icon.svg'} alt="Bed icon" width={40} height={40} />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded" />
          )}
        </div>
        <h3 className="text-[14px] font-medium leading-[17px] text-[#19191A]">{room?.title}</h3>
        {room?.noOfKingBedrooms && (
          <p className="text-[12px] font-normal leading-[15px] text-[#19191A]">
            {room?.noOfKingBedrooms} King Bed
          </p>
        )}
        {room?.noOfDoubleBedrooms && (
          <p className="text-[12px] font-normal leading-[15px] text-[#19191A]">
            {room?.noOfDoubleBedrooms} Double Bed
          </p>
        )}{' '}
        {room?.noOfSingleBedrooms && (
          <p className="text-[12px] font-normal leading-[15px] text-[#19191A]">
            {room?.noOfSingleBedrooms} Single Bed
          </p>
        )}
      </div>
    </>
  )
}

export default BedroomCard
