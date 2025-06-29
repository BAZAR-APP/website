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
import { IBooking } from '@/lib/types/booking'
import { format } from 'date-fns'

interface BookingCardProps {
  booking: IBooking
  onClick?: () => void
  onSeeDetails?: (id: string) => void
  onViewInvoice?: (id: string) => void
  showRating?: boolean
}

const BookingCard: React.FC<BookingCardProps> = ({
  onClick,
  onSeeDetails,
  onViewInvoice,
  showRating,
  booking,
}) => {
  const { isOpen: isReviewOpen, open: openReview, close: closeReview } = useToggle(false)
  const { isOpen: isThanksOpen, open: openThanks, close: closeThanks } = useToggle(false)

  return (
    <>
      <div
        onClick={onClick}
        className="flex md:flex-row flex-col w-full max-w-[675px] 2xl:max-w-[800px] p-3 mt-12 gap-5 bg-[#F9FAFB] cursor-pointer rounded-[16px] hover:shadow-sm transition-shadow duration-300"
      >
        <div className="w-full md:max-w-[311px] max-w-full flex-shrink-0">
          <Image
            src={'https://picsum.photos/seed/lakeside/311/190'}
            alt={'alt'}
            className="w-full h-full max-h-[216px] object-cover rounded-[12px]"
            width={305}
            height={216}
          />
        </div>

        <div className={`flex flex-col ${showRating ? 'gap-2.5' : 'gap-4'} flex-1 min-w-0`}>
          {' '}
          <div className="flex items-center flex-wrap gap-2 justify-between">
            <h3 className="lg:text-xl text-lg font-normal text-[#484A4C] truncate">
              {'Title From API'}
            </h3>
            <div className="lg:text-[18px] text-[16px] leading-[28px] font-medium text-[#484A4C]">
              {booking?.grandTotal} KWD
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Location
              icon={<MapPin className="w-4 h-4 text-[#8E8E93]" />}
              text={'location from api'}
              className="text-[#8E8E93] text-sm"
            />

            <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[110px]">
              <Image src="/images/Points.svg" width={16} height={16} alt="Points Icon" />
              <span className="text-[#29397E] text-sm">{booking?.noOfGuests} Points</span>
            </div>
          </div>
          <p className="text-sm w-full text-[#8E8E93] leading-5">
            <span> {booking?.noOfGuests} </span>
            <span className="text-[#9EA0A2] text-[8px] pr-1">&bull;</span>
            <span>{'booking type form api'}</span>{' '}
            <span className="text-[#9EA0A2] text-[8px] pr-1">&bull;</span>
            <span>{'room from api'}</span> beds{' '}
            <span className="text-[#9EA0A2] text-[8px] pr-1">&bull;</span>
            <span>{'baths from api'}</span> baths &nbsp;
            {['Fireplace', 'Hiking Trails', 'Pet Friendly'].map((amenity, index) => (
              <span key={index} className="text-[#8E8E93] text-sm font-normal">
                <span>{amenity}</span>
                {index < ['Fireplace', 'Hiking Trails', 'Pet Friendly'].length - 1 && (
                  <span className="mx-1 text-[#9EA0A2] text-[8px]">&bull;</span>
                )}
              </span>
            ))}
          </p>
          <div className="flex sm:items-center items-start gap-1">
            <Image src="/images/date.svg" width={20} height={20} alt="Date icon" />
            <p className="text-sm leading-[17px] text-[#9EA0A2] pt-[1.5px]">
              From {format(new Date(), 'dd/MM/yyyy')} To {format(new Date(), 'dd/MM/yyyy')}
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
              onClick={() => onSeeDetails?.(booking?.id)}
              intent="transperent"
              className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex gap-1.5 items-center"
            >
              See Details <ChevronRight className="w-3 h-3" strokeWidth={3} />
            </Button>
            <Button
              onClick={() => onViewInvoice?.(booking?.id)}
              intent="transperent"
              className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex gap-1.5 items-center"
            >
              View Invoice or Contract <ChevronRight className="w-3 h-3" strokeWidth={3} />
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
