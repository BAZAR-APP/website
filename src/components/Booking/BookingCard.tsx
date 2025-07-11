import React, { useState } from 'react'
import { MapPin, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Location from '../Location'
import Button from '../Button/Button'
import StarRating from '../About/StarRating'
import useToggle from '@/lib/hooks/useToggle'
import SubmitReviewDialog from './SubmitReviewDailog'
import ThanksReviewDialog from './ThanksReviewDialog' // Make sure this is the correct path
import { IBooking } from '@/lib/types/booking'
import { format } from 'date-fns'
import api from '@/lib/axios'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'

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
  const [loading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const submitReview = async (data: { rating: number; text: string }) => {
    setIsLoading(true)
    try {
      await api.post('/chalets/review', {
        rating: data?.rating,
        reviewText: data?.text,
        rewardPoints: 200,
        isPublished: true,
        chaletId: booking?.chaletId,
        bookingId: booking?.id,
      })
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] }), closeReview()
      openThanks()
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <div
        onClick={onClick}
        className="flex md:flex-row md:items-center flex-col w-full max-w-[675px] 2xl:max-w-[800px] p-3 mt-12 gap-5 bg-[#F9FAFB] cursor-pointer rounded-[16px] hover:shadow-sm transition-shadow duration-300"
      >
        <div className="w-full md:max-w-[311px] max-w-full flex-shrink-0">
          <Image
            src={booking?.chalet?.photoURL || 'https://picsum.photos/seed/lakeside/311/190'}
            alt={'alt'}
            className="w-full h-full min-h-[230px] max-h-[235px] object-cover rounded-[12px]"
            width={305}
            height={216}
          />
        </div>

        <div className={`flex flex-col ${showRating ? 'gap-2.5' : 'gap-4'} flex-1 min-w-0`}>
          {' '}
          <div className="flex items-center flex-wrap gap-2 justify-between">
            <h3 className="lg:text-xl text-lg font-normal text-[#484A4C] truncate">
              {booking?.chalet?.title}
            </h3>
            <div className="lg:text-[18px] text-[16px] leading-[18px] font-medium text-[#484A4C]">
              {booking?.grandTotal} KWD
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Location
              icon={<MapPin className="w-4 h-4 text-[#8E8E93]" />}
              text={booking?.chalet?.city}
              className="text-[#8E8E93] text-sm"
            />

            <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[110px]">
              <Image src="/images/Points.svg" width={16} height={16} alt="Points Icon" />
              <span className="text-[#29397E] text-sm">
                {booking?.chalet?.noOfLoyalityPoints} Points
              </span>
            </div>
          </div>
          <p className="text-sm w-full text-[#8E8E93] leading-5">
            <span> {booking?.noOfGuests} guests </span>
            {/* <span className="text-[#9EA0A2] text-[8px] pr-1">&bull;</span> */}
            {/* <span>{'booking type form api'}</span>{' '} */}
            <span className="text-[#9EA0A2] text-[8px] pr-1">&bull;</span>
            <span>{booking?.chalet?.maxNoOfBeds}</span> beds{' '}
            <span className="text-[#9EA0A2] text-[8px] pr-1">&bull;</span>
            <span>{booking?.chalet?.noOfBaths}</span> baths &nbsp;
            {booking?.chalet?.amenities.map((amenity, index) => (
              <span key={index} className="text-[#8E8E93] text-sm font-normal">
                <span>{amenity?.title}</span>
                {index < ['Fireplace', 'Hiking Trails', 'Pet Friendly'].length - 1 && (
                  <span className="mx-1 text-[#9EA0A2] text-[8px]">&bull;</span>
                )}
              </span>
            ))}
          </p>
          <div className="flex sm:items-center items-start gap-1">
            <Image src="/images/date.svg" width={20} height={20} alt="Date icon" />
            <p className="text-sm leading-[17px] text-[#9EA0A2] pt-[1.5px]">
              From {format(new Date(booking?.startDate), 'dd/MM/yyyy')} To{' '}
              {format(new Date(booking?.endDate), 'dd/MM/yyyy')}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (booking?.review?.id) return
              openReview()
            }}
            className="cursor-pointer"
          >
            <StarRating className="!mb-0" rating={Number(booking?.review?.rating)} />
          </button>
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

      {isReviewOpen && (
        <SubmitReviewDialog
          isOpen={isReviewOpen}
          setIsOpen={closeReview}
          onSubmit={(data: { rating: number; text: string }) => {
            submitReview(data)
          }}
          data={booking}
          loading={loading}
        />
      )}

      {isThanksOpen && <ThanksReviewDialog isOpen={isThanksOpen} setIsOpen={closeThanks} />}
    </>
  )
}

export default BookingCard
