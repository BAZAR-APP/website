import React, { useState } from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import Button from '../Button/Button'
import Image from 'next/image'
import { ChevronRight, Download, MapPin } from 'lucide-react'
import Location from '../Location'
import { IBooking } from '@/lib/types/booking'
import StarRating from '../About/StarRating'
import { calculateLoyaltyPoints } from '@/lib/utils'

interface SubmitReviewDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSubmit: (data: { rating: number; text: string }) => void
  onCancel?: () => void
  data: IBooking
  loading: boolean
}

const SubmitReviewDialog: React.FC<SubmitReviewDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  onCancel = () => setIsOpen(false),
  data,
  loading = false,
}) => {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const propertyTitle = data?.chalet?.title || 'Property'
  const guests = data?.noOfGuests || 0
  const propertyType = data?.chalet?.isEntireHomeAvailabe ? 'Entire Home' : 'Private Room'
  const beds = data?.chalet?.maxNoOfBeds || 0
  const baths = data?.chalet?.noOfBaths || 0
  const amenities = data?.chalet?.amenities?.map((a) => a.title) || []
  const imageUrl = data?.chalet?.photoURL || '/images/fallback.jpg'
  const imageAlt = propertyTitle
  const points = calculateLoyaltyPoints(data?.chalet?.noOfLoyalityPoints, data?.noOfNights, data?.noOfNights === 0)

  const fullAddress = [
    data?.chalet?.pinTitle,
    data?.chalet?.street1,
    data?.chalet?.street2,
    data?.chalet?.city,
    data?.chalet?.state,
    data?.chalet?.country,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="lg:min-w-[524px] min-w-auto h-[95%] min-[1440px]:h-[98%]"
      title="Share Your Experience"
    >
      <p className="sm:text-xl text-sm sm:leading-6 leading-4 text-[#484A4C] py-2">
        Tell us what you loved (or what we can do better). Your feedback helps us improve!
      </p>

      <StarRating rating={rating} onChange={setRating} />
      {imageUrl && (
        <div className="w-full h-[216px] flex-shrink-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-[12px]"
            width={400}
            height={400}
          />
        </div>
      )}
      <div className="flex items-center flex-wrap gap-3 pt-3">
        <h3 className="text-[16px] font-medium text-[#19191A]">{propertyTitle}</h3>
        <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[110px]">
          <Image src="/images/Points.svg" width={16} height={16} alt="Points Icon" />
          <span className="text-[#29397E] text-sm">{points} Points</span>
        </div>
      </div>

      <div className="text-sm text-[#8E8E93] leading-5 pt-2">
        {guests} guests <span className="text-[#9EA0A2] text-[9px] pr-1">&bull;</span>
        {propertyType} <span className="text-[#9EA0A2] text-[9px] pr-1">&bull;</span>
        {beds} beds <span className="text-[#9EA0A2] text-[9px] pr-1">&bull;</span>
        {baths} baths
        {amenities.length > 0 && (
          <>
            <span className="text-[#9EA0A2] text-[9px] px-1">&bull;</span>
            {amenities.map((title, index) => (
              <span key={index} className="text-[#8E8E93] text-sm font-normal">
                {title}
                {index < amenities.length - 1 && (
                  <span className="mx-1 text-[#9EA0A2] text-[9px]">&bull;</span>
                )}
              </span>
            ))}
          </>
        )}
        <br />
        <Location
          className="flex items-start py-1.5"
          icon={<MapPin className="w-4.5 h-4.5 text-[#8E8E93] mt-1" />}
          text={fullAddress}
        />
      </div>

      <div className="flex items-center gap-2 justify-between flex-wrap pt-4">
        <Button
          onClick={() => {}}
          intent="transperent"
          className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex gap-1 items-center"
        >
          <MapPin className="w-3.5 h-3.5 text-[#29397E]" />
          <span> View Exact Location</span>{' '}
          <ChevronRight className="w-3 h-3 mt-0.5" strokeWidth={3} />
        </Button>
        <Button
          onClick={() => {}}
          intent="transperent"
          className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex gap-1 items-center"
        >
          <Image src="/images/ReferIcon.svg" width={16} height={16} alt="Refer" />{' '}
          <span>Refer A Friend</span>
          <Image src="/images/Arrow.svg" width={14} height={14} alt="arrow" />
        </Button>
        <Button
          onClick={() => {}}
          intent="transperent"
          className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline flex gap-1 items-center"
        >
          Download Invoice <Download className="w-4 h-4 text-[#29397E]" />
        </Button>
      </div>
      <textarea
        className="w-full h-52 mt-6 p-3 bg-[#F9FAFB] text-[#19191A] focus:border-none focus:outline-none rounded resize-none text-[16px]"
        placeholder="Write about your stay—what you liked, how the chalet was, or anything you'd like future guests to know..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
        <Button
          onClick={onCancel}
          intent="ghost"
          className="w-full py-2 text-[16px] font-medium rounded-lg cursor-pointer text-[#19191A] bg-[#F3F4F6]"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSubmit({ rating, text: reviewText })
            setRating(0)
            setReviewText('')
          }}
          className="w-full py-2 text-[16px] font-medium text-[#FDFDFE] bg-indigo-800 rounded-lg cursor-pointer"
          disabled={loading}
          loading={loading}
        >
          Submit Review
        </Button>
      </div>
    </ModalDialog>
  )
}

export default SubmitReviewDialog
