'use client'
import Image from 'next/image'
import React from 'react'
import clsx from 'clsx'
import { ChaletBedroom } from '../../types/chalets'
import { useBookingStore } from '../../stores/useBookingStore'

type BedroomCardProps = {
  room: ChaletBedroom
  className?: string
}

const BedroomCard: React.FC<BedroomCardProps> = ({ className = '', room }) => {
  const { setRoom, selectedRoom } = useBookingStore()

  const isSelected = selectedRoom?.id === room.id

  return (
    <>
      <div
        className={clsx(
          'rounded-[20px] py-3 px-4 flex flex-col items-start space-y-2.5 transition-all duration-200 cursor-pointer min-w-[120px]',
          {
            'bg-white border border-[#E5E5EA] hover:shadow-md': !isSelected,
            'bg-white-50 border-2 border-[#29397e] shadow-md': isSelected,
          },
          className,
        )}
        onClick={() => setRoom(room)}
      >
        <div className="flex items-center justify-center">
          <Image src={'/images/Icon.svg'} alt="Bed icon" width={40} height={40} />
        </div>
        <h3
          className={clsx('text-[14px] font-medium leading-[17px]', {
            'text-[#19191A]': !isSelected,
            'text-primary-blue font-medium': isSelected,
          })}
        >
          {room?.title}
        </h3>
        {room?.noOfKingBedrooms && (
          <p
            className={clsx('text-[12px] font-normal leading-[15px]', {
              'text-[#19191A]': !isSelected,
              'text-primary-blue': isSelected,
            })}
          >
            {room?.noOfKingBedrooms} King Bed
          </p>
        )}
        {room?.noOfDoubleBedrooms && (
          <p
            className={clsx('text-[12px] font-normal leading-[15px]', {
              'text-[#19191A]': !isSelected,
              'text-primary-blue': isSelected,
            })}
          >
            {room?.noOfDoubleBedrooms} Double Bed
          </p>
        )}
        {room?.noOfSingleBedrooms && (
          <p
            className={clsx('text-[12px] font-normal leading-[15px]', {
              'text-[#19191A]': !isSelected,
              'text-primary-blue': isSelected,
            })}
          >
            {room?.noOfSingleBedrooms} Single Bed
          </p>
        )}
      </div>
    </>
  )
}

export default BedroomCard
