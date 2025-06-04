// components/BedroomCard.tsx
import Image from 'next/image'
import React from 'react'

type BedroomCardProps = {
  roomNumber?: number
  bedType?: string
  bedCount?: number
  imageSrc?: string
  className?: string
  onClick?: () => void
}

const BedroomCard: React.FC<BedroomCardProps> = ({
  roomNumber = 1,
  bedType = 'Double Bed',
  bedCount = 1,
  imageSrc,
  className = '',
  onClick,
}) => {
  return (
    <>
      <div
        className={`bg-white border border-[#E5E5EA] rounded-[20px] py-3 px-4 flex flex-col items-start text-center space-y-2.5 hover:shadow-md transition-shadow cursor-pointer min-w-[120px] ${className}`}
        onClick={onClick}
      >
        <div className="flex items-center justify-center">
          {imageSrc ? (
            <Image src={imageSrc} alt="Bed icon" width={40} height={40} />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded" />
          )}
        </div>

        <h3 className="text-[14px] font-medium leading-[17px] text-[#19191A]">
          Bedroom {roomNumber}
        </h3>
        <p className="text-[12px] font-normal leading-[15px] text-[#19191A]">
          {bedCount} {bedType}
        </p>
      </div>
    </>
  )
}

export default BedroomCard
