import React from 'react'
import { MapPin, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Location from '../Location'
import Button from '../Button/Button'
import StarRating from '../About/StarRating'
import useToggle from '@/lib/hooks/useToggle'
import SubmitReviewDialog from './SubmitReviewDailog'
import ThanksReviewDialog from './ThanksReviewDialog' // Make sure this is the correct path
import { submitReview } from '@/lib/constant'

interface BookingCardProps {
  id: string
  title: string
  location: string
  price: string
  points?: number
  guests: string
  propertyType: string
  beds: number
  baths: number
  amenities: string[]
  dateRange: {
    from: string
    to: string
  }
  imageUrl: string
  imageAlt?: string
  onClick?: () => void
  onSeeDetails?: (id: string) => void
  onViewInvoice?: (id: string) => void
  showRating?: boolean
}

const BookingCard: React.FC<BookingCardProps> = ({
  id,
  title,
  location,
  price,
  points,
  guests,
  propertyType,
  beds,
  baths,
  amenities,
  dateRange,
  imageUrl,
  imageAlt = 'Property image',
  onClick,
  onSeeDetails,
  onViewInvoice,
  showRating,
}) => {
  const { isOpen: isReviewOpen, open: openReview, close: closeReview } = useToggle(false)
  const { isOpen: isThanksOpen, open: openThanks, close: closeThanks } = useToggle(false)

  return (
    <>
      <div
        onClick={onClick}
        className="flex md:flex-row flex-col w-full max-w-[700px] xl:max-w-[800px] p-4 mt-12 gap-5 bg-[#F9FAFB] cursor-pointer rounded-[16px] hover:shadow-sm transition-shadow duration-300"
      >
        <div className="w-full md:max-w-[311px] max-w-full h-[216px] flex-shrink-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-[12px]"
          />
        </div>

        <div className={`flex flex-col ${showRating ? 'gap-2.5' : 'gap-4'} flex-1 min-w-0`}>
          {' '}
          <div className="flex items-center flex-wrap gap-2 justify-between">
            <h3 className="sm:text-xl text-lg font-normal text-[#484A4C] truncate">{title}</h3>
            <div className="text-[18px] leading-[28px] font-medium text-[#484A4C]">{price} KWD</div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Location
              icon={<MapPin className="w-4 h-4 text-[#9EA0A2]" />}
              text={location}
              className="text-[#9EA0A2]"
            />

            <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[110px]">
              <Image src="/images/Points.svg" width={16} height={16} alt="Points Icon" />
              <span className="text-[#29397E] text-sm">{points} Points</span>
            </div>
          </div>
          <div className="text-sm text-[#8E8E93] leading-5">
            {guests} <span className="text-[#9EA0A2] text-[9px] pr-1">&bull;</span>
            {propertyType} <span className="text-[#9EA0A2] text-[9px] pr-1">&bull;</span>
            {beds} beds <span className="text-[#9EA0A2] text-[9px] pr-1">&bull;</span>
            {baths} baths
            <br />
            {amenities.map((amenity, index) => (
              <span key={index} className="text-[#8E8E93] text-sm font-normal">
                {amenity}
                {index < amenities.length - 1 && (
                  <span className="mx-1 text-[#9EA0A2] text-[9px]">&bull;</span>
                )}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Image src="/images/date.svg" width={20} height={20} alt="Date icon" />
            <p className="text-sm leading-[17px] text-[#9EA0A2]">
              From {dateRange.from} To {dateRange.to}
            </p>
          </div>

          {showRating && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                openReview()
              }}
              className="cursor-pointer"
            >
              <StarRating className="!mb-0" rating={5} />
            </button>
          )}

          <div className="flex items-center gap-2 justify-between flex-wrap">
            <Button
              onClick={() => onSeeDetails?.(id)}
              intent="transperent"
              className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline flex items-center"
            >
              See Details <ChevronRight className="w-4 h-4" strokeWidth={3} />
            </Button>
            <Button
              onClick={() => onViewInvoice?.(id)}
              intent="transperent"
              className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline flex items-center"
            >
              View Invoice or Contract <ChevronRight className="w-4 h-4" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>

      <SubmitReviewDialog
        isOpen={isReviewOpen}
        setIsOpen={closeReview}
        onSubmit={() => {
          closeReview()
          openThanks()
        }}
        data={submitReview}
      />

      <ThanksReviewDialog isOpen={isThanksOpen} setIsOpen={closeThanks} />
    </>
  )
}

export default BookingCard
