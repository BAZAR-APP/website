'use client'
import React from 'react'
import { MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'
import Button from './Button/Button'
import CommonInput from './CommonInput/Input'
import PriceRowUI from './PriceRow'
import RedeemRewards from './Booking/RedeemRewards'
import { useParams, useRouter } from 'next/navigation'
import { useBookingStore } from '../../stores/useBookingStore'
import { format } from 'date-fns'
import { Customization } from '@/lib/types/booking'
import api from '@/lib/axios'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { useUserStore } from '../../stores/useUserStore'

// Extracted common text styles
const textStyles = {
  body: 'text-[14px] font-normal leading-[17px] text-[#9EA0A2] font-inter',
  price: 'text-[16px] leading-[150%] font-medium',
  primaryBlue: 'primary-blue',
  darkText: 'text-[#19191A]',
}

// Coupon input section
const CouponSection: React.FC<{
  onChange: (value: string) => void
  onApply: () => void
  isDisabled: boolean
}> = ({ onChange, onApply, isDisabled }) => (
  <div className="relative">
    <CommonInput
      name="redeemCode"
      type="text"
      onChange={(value) => onChange?.(value?.target?.value)}
      placeholder="Apply redeemed code here"
      className="!bg-[#F3F4F6] !text-[#484A4C] mt-1 relative !rounded-[8px] !border-none !h-[42px] placeholder:text-[#9EA0A2]"
    />
    <span
      onClick={!isDisabled ? onApply : undefined}
      className={`font-medium text-[14px] leading-[17px] absolute top-3.5 right-4 cursor-pointer ${
        isDisabled ? 'text-[#B0B3B8] cursor-not-allowed' : 'text-[#29397E]'
      }`}
    >
      Apply
    </span>
    <RedeemRewards />
  </div>
)

const PaymentSplitSection: React.FC = () => (
  <>
    <hr className="my-4" />
    <PriceRowUI
      label="Amount Due Now"
      amount="220 KWD"
      color={textStyles.primaryBlue}
      labelFont="medium"
    />
    <PriceRowUI
      label="Remaining Balance"
      amount="220 KWD"
      color={textStyles.primaryBlue}
      labelFont="medium"
    />
    <p className={`flex items-center mb-2 mt-4 ${textStyles.body} self-stretch`}>
      Due at least 72 hours before check-in
    </p>
  </>
)

type BookingSummaryProps = {
  showBookButton?: boolean
  showRedeemeCodeSection?: boolean
  paidAmount?: boolean
  remaingAmount?: boolean
  earnPoints?: boolean
  finalPayment?: boolean
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  showBookButton = false,
  showRedeemeCodeSection = false,
  paidAmount = false,
  remaingAmount = false,
  earnPoints = true,
  finalPayment = false,
}) => {
  const { id } = useParams()
  const { getValues, watch, setValue } = useFormContext()
  const { selectedDiscount } = useUserStore()
  const [isDiscountApplied, setIsDiscountApplied] = React.useState(false)
  const [discountedTotal, setDiscountedTotal] = React.useState<number | null>(null)
  const router = useRouter()
  const selectedAddons: Customization[] = watch('addons') || []
  const selectedAddonsTotal = watch('selectedAddonsTotal')
  const redeemedCode = watch('redeemed_code')
  const romanticWeekend = watch('romanticWeekend')

  const {
    selectedDates,
    selectedPlan,
    selectedRoom,
    guests,
    packageAmount,
    noOfNights,
    totalCostAgainstNights,
    resetBooking,
  } = useBookingStore()
  const isSplitPayment = getValues()?.paymentOption === 'split'

  const grandTotal = selectedAddonsTotal + 200 + Number(packageAmount) + (romanticWeekend ? 25 : 0)

  const handleApplyDiscount = () => {
    if (!selectedDiscount?.discountPercent || !grandTotal) return
    const discountAmount = (grandTotal * selectedDiscount?.discountPercent) / 100
    const finalTotal = grandTotal - discountAmount
    setDiscountedTotal(finalTotal)
    setIsDiscountApplied(true)
    toast.success(`Discount of ${selectedDiscount?.discountPercent}% applied!`)
  }

  const bookNow = async () => {
    const customizations = selectedAddons?.map((customization: Customization) => ({
      id: customization?.id,
      quantity: customization?.selectedQuantity,
    }))
    try {
      const body = {
        startDate: selectedDates?.checkIn,
        endDate: selectedDates?.checkOut,
        noOfGuests: guests,
        noOfNights: noOfNights || 0,
        totalCostAgainstNights: totalCostAgainstNights || 0,
        bookingStatus: 'PENDING',
        refundableDepositAmount: 0,
        grandTotal: isDiscountApplied ? discountedTotal : grandTotal,
        chaletId: id,
        sleepingRoomId: selectedRoom?.id,
        chaletSubscriptionId: selectedPlan?.id,
        customizations: customizations,
        isRomanticBookingSelected: !!romanticWeekend,
      }
      await api.post('/booking', body)
      resetBooking()
      router.replace(`/chalet/${id}/booking/payment-confirmed`)
    } catch (error) {
      toast.error(extractErrorMessage(error))
    }
  }

  return (
    <>
      <div className="w-full md:max-w-sm rounded-lg bg-[#F9FAFB] sm:px-6 sm:py-5 p-3">
        <h3 className="xl:text-[25px] text-lg font-semibold text-[#19191A] mb-3">
          Booking Summary
        </h3>
        <div className="p-0">
          <div className="relative">
            <Image
              src="https://picsum.photos/200/300"
              alt="Luxury Lakeside Retreat"
              width={200}
              height={200}
              className="w-full h-46 object-cover rounded-[24px]"
            />
          </div>

          <div className="py-3.5">
            <div className="flex items-start flex-wrap justify-between mb-3">
              <h3 className="text-[16px] leading-[24px] font-medium text-[#19191A] font-inter">
                Luxury Lakeside Retreat
              </h3>
              <div className="flex items-center text-sm text-[#8E8E93] lg:mt-0 mt-1">
                <MapPin size={16} className="mr-1" />
                Al Khiran
              </div>
            </div>

            <div className={`flex items-center mb-3.5 ${textStyles.body}`}>
              <Calendar size={16} className="mr-2" />
              From {format(selectedDates?.checkIn, 'd MMMM yyyy')} to{' '}
              {format(selectedDates?.checkOut, 'd MMMM yyyy')}
            </div>

            {earnPoints && (
              <>
                <div className="text-sm text-[#9EA0A2] mb-3">
                  You&apos;ll earn 200 points with this booking!
                </div>
                <div className="flex bg-[#E1F3FF] items-center justify-between gap-1 rounded py-1 px-1.5 max-w-[111px]">
                  <Image src="/images/Points.svg" width={16} height={16} alt="Points" />
                  <span className="text-[#29397E] text-sm">200 Points</span>
                </div>
              </>
            )}

            <div className="bg-[#FCE7F3] rounded-lg py-1 px-1.5 my-3">
              <p className="text-[10px] text-[#EC4899] leading-relaxed">
                A refundable security deposit of 200 KWD is required. This amount will be held and
                returned within 72 hours after checkout if no damage is reported.
              </p>
            </div>

            <div className="space-y-3 text-sm pt-2 !text-[#19191A]">
              {selectedAddons?.map((selectedAddon, index) => (
                <PriceRowUI
                  key={index}
                  label={selectedAddon?.title}
                  amount={
                    selectedAddon?.costPerNight * (Number(selectedAddon?.selectedQuantity) ?? 1) +
                    ' KWD'
                  }
                />
              ))}
              <PriceRowUI label="Refundable Deposit" amount="200 KWD" />
              {romanticWeekend && <PriceRowUI label="Romantic Weekend" amount="25 KWD" />}
              <hr className="my-4" />

              {isDiscountApplied && (
                <div className="flex justify-between items-center text-sm text-[#9EA0A2] line-through">
                  <span>Original Total</span>
                  <span>{grandTotal.toFixed(2)} KWD</span>
                </div>
              )}
              <PriceRowUI
                label={isDiscountApplied ? 'Discounted Total' : 'Total'}
                amount={`${(isDiscountApplied ? discountedTotal : grandTotal)?.toFixed(2)} KWD`}
                labelFont="medium"
              />
            </div>

            <p className={`flex items-center mb-2 mt-4 ${textStyles.body} self-stretch`}>
              Deposit will be returned after your stay, subject to property condition.
            </p>

            {paidAmount && (
              <div className="font-medium text-base leading-[150%] flex items-center justify-between gap-2 py-2 text-[#29397E]">
                <span>Paid Amount</span>
                <span>220 KWD</span>
              </div>
            )}

            {remaingAmount && (
              <div className="font-medium text-base leading-[150%] flex items-center justify-between gap-2 py-2 text-[#29397E]">
                <span>Remaining Balance</span>
                <span>220 KWD</span>
              </div>
            )}

            {isSplitPayment && <PaymentSplitSection />}

            {showRedeemeCodeSection && (
              <CouponSection
                onChange={(value: string) => {
                  setValue('redeemed_code', value)
                  setIsDiscountApplied(false)
                  setDiscountedTotal(null)
                }}
                onApply={handleApplyDiscount}
                isDisabled={!redeemedCode}
              />
            )}

            {showBookButton && (
              <Button
                className="w-full text-white mt-3.5 !px-0 rounded-lg font-medium cursor-pointer"
                onClick={bookNow}
              >
                {isSplitPayment ? 'Book Now with 50% Payment' : 'Book Now'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {finalPayment && (
        <p className="italic font-normal text-base leading-[19px] text-[#9EA0A2] w-full max-w-[390px] py-4">
          This is your final payment. Once completed, your booking will be fully secured.
        </p>
      )}
    </>
  )
}

export default BookingSummary
