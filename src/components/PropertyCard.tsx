import React from 'react'
import { Heart } from 'lucide-react'

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
}) => {
  return (
    <div className="flex w-[300px] flex-col items-start gap-6 relative bg-gray-50 p-3 rounded-2xl max-md:w-full">
      <div className="flex h-[184px] justify-center items-center self-stretch relative rounded-xl">
        <img
          src={imageUrl}
          alt={title}
          className="h-[184px] flex-[1_0_0] absolute w-[276px] left-0 top-0 object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col items-start gap-5 self-stretch relative">
        <div className="flex items-start gap-6 self-stretch relative">
          <div className="flex flex-col items-start gap-2 flex-[1_0_0] relative">
            <div className="self-stretch text-[#484A4C] text-xl font-normal relative">{title}</div>
            <div className="flex items-center gap-1 relative">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path
                  d="M10 7.5C10 8.03043 9.78929 8.53914 9.41421 8.91421C9.03914 9.28929 8.53043 9.5 8 9.5C7.46957 9.5 6.96086 9.28929 6.58579 8.91421C6.21071 8.53914 6 8.03043 6 7.5C6 6.96957 6.21071 6.46086 6.58579 6.08579C6.96086 5.71071 7.46957 5.5 8 5.5C8.53043 5.5 9.03914 5.71071 9.41421 6.08579C9.78929 6.46086 10 6.96957 10 7.5Z"
                  stroke="#8E8E93"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 7.5C13 12.2613 8 15 8 15C8 15 3 12.2613 3 7.5C3 6.17392 3.52678 4.90215 4.46447 3.96447C5.40215 3.02678 6.67392 2.5 8 2.5C9.32608 2.5 10.5979 3.02678 11.5355 3.96447C12.4732 4.90215 13 6.17392 13 7.5Z"
                  stroke="#8E8E93"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-[#8E8E93] text-sm font-normal relative">{location}</div>
            </div>
          </div>
          <button
            className="flex w-8 h-8 justify-center items-center relative p-1"
            aria-label="Add to favorites"
          >
            <Heart className="w-6 h-6 text-[#29397E]" />
          </button>
        </div>
        <div className="flex flex-col items-start self-stretch relative">
          <div className="self-stretch text-[#8E8E93] text-sm font-normal relative">
            {guests} · Entire Home · {beds} · {baths}
          </div>
          <div className="self-stretch text-[#8E8E93] text-sm font-normal relative">
            {amenities.join(' · ')}
          </div>
        </div>
        <div className="flex justify-end items-end gap-4 self-stretch relative">
          <div className="flex items-center gap-1 flex-[1_0_0] relative">
            <div className="w-3 text-[#484A4C] text-sm font-normal tracking-[0.32px] relative">
              {rating}
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99008 2.67502C9.36342 1.77752 10.6368 1.77752 11.0101 2.67502L12.7451 6.84668L17.2484 7.20835C18.2184 7.28585 18.6118 8.49585 17.8726 9.12918L14.4418 12.0684L15.4893 16.4625C15.7151 17.4092 14.6859 18.1567 13.8559 17.65L10.0001 15.295L6.14425 17.65C5.31425 18.1567 4.28508 17.4083 4.51092 16.4625L5.55842 12.0684L2.12758 9.12918C1.38842 8.49585 1.78175 7.28585 2.75175 7.20835L7.25508 6.84668L8.99008 2.67502Z"
                fill="#FFCC00"
              />
            </svg>
            <div className="text-[#484A4C] text-sm font-normal relative">({reviews} reviews)</div>
          </div>
          <div className="flex justify-end items-center gap-2 relative">
            <div className="text-[#484A4C] text-lg font-medium leading-7 relative">{price} KD</div>
            <div className="text-[#484A4C] text-sm font-normal relative">/{priceUnit}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
