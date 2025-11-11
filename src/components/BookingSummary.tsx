'use client'
import React, { useState } from 'react'
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
import OverlayLoader from './OverlayLoader'
import { Locale } from '../../i18n.config'

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
  value: any
}> = ({ onChange, onApply, isDisabled, value }) => (
  <div className="relative">
    <CommonInput
      name="redeemCode"
      type="text"
      onChange={(value) => onChange?.(value?.target?.value)}
      value={value}
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

const PaymentSplitSection: React.FC<{ finalFullAmount: number }> = ({ finalFullAmount }) => (
  <>
    <hr className="my-4" />
    <PriceRowUI
      label="Amount Due Now"
      amount={Math.round(finalFullAmount / 2)?.toString() + ' KWD'}
      color={textStyles.primaryBlue}
      labelFont="medium"
    />
    <PriceRowUI
      label="Remaining Balance"
      amount={Math.round(finalFullAmount / 2)?.toString() + ' KWD'}
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
  lang: Locale
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  showBookButton = false,
  showRedeemeCodeSection = false,
  paidAmount = false,
  remaingAmount = false,
  earnPoints = true,
  finalPayment = false,
  lang
}) => {
  const { id } = useParams()
  const { getValues, watch } = useFormContext()
  const { setSelectedDiscount } = useUserStore()
  const router = useRouter()
  const selectedAddons: Customization[] = watch('addons') || []
  const selectedAddonsTotal = watch('selectedAddonsTotal')
  const romanticWeekend = watch('romanticWeekend')
  const [loading, setLoading] = useState(false)
  const {
    selectedDates,
    selectedPlan,
    selectedRoom,
    guests,
    packageAmount,
    noOfNights,
    totalCostAgainstNights,
    isDiscountApplied,
    discountedTotal,
    discountCode,
    setDiscountCode,
    setDiscountedTotal,
    setIsDiscountApplied,
    resetBooking,
    chaletDetails,
  } = useBookingStore()

  const isSplitPayment = getValues()?.paymentOption === 'split'
  const grandTotal = (selectedAddonsTotal ?? 0) + Number(packageAmount) + (romanticWeekend ? 25 : 0)
  const handleApplyDiscount = async () => {
    setLoading(true)
    try {
      const res = await api.get(`loyaltyRewards/readByCouponCode/${discountCode}`)
      const discountAmount = (grandTotal * res?.data?.discountPercent) / 100
      const finalTotal = grandTotal - discountAmount
      setDiscountedTotal(finalTotal)
      setIsDiscountApplied(true)
      toast.success(`Discount of ${res?.data?.discountPercent}% applied!`)
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const bookNow = async () => {
    const customizations = selectedAddons?.map((customization: Customization) => ({
      id: customization?.chaletCustomizationId,
      quantity: customization?.selectedQuantity,
      ...(customization.selectedDate && {
        selectedDate: customization.selectedDate,
      }),
    }))
    try {
      setLoading(true)
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
        isPartialPayment: isSplitPayment,
        ...(isDiscountApplied && { couponCode: discountCode }),
      }
      await api.post('/booking', body)
      setSelectedDiscount(null)
      resetBooking()
      router.replace(`/chalet/${id}/booking/payment-confirmed`)
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="w-full md:max-w-sm rounded-lg bg-[#F9FAFB] sm:px-6 sm:py-5 p-3">
       <h3 className="xl:text-[25px] text-lg font-semibold text-[#19191A] mb-3">
        {lang === 'en' ? 'Booking Summary' : 'ملخص الحجز'}
      </h3>
        <div className="p-0">
          <div className="relative">
            <Image
              src={chaletDetails?.photoURL || ''}
              alt={chaletDetails?.title || ''}
              width={200}
              height={200}
              className="w-full h-46 object-cover rounded-[24px]"
            />
          </div>

          <div className="py-3.5">
            <div className="flex items-start flex-wrap justify-between mb-3">
              <h3 className="text-[16px] leading-[24px] font-medium text-[#19191A] font-inter">
                {chaletDetails?.title}
              </h3>
              <div className="flex items-center text-sm text-[#8E8E93] lg:mt-0 mt-1">
                <MapPin size={16} className="mr-1" />
                {chaletDetails?.city}
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
                  You&apos;ll earn {chaletDetails?.noOfLoyalityPoints} points with this booking!
                </div>
                <div className="flex bg-[#E1F3FF] items-center justify-between gap-1 rounded py-1 px-1.5 max-w-[111px]">
                  <Image src="/images/Points.svg" width={16} height={16} alt="Points" />
                  <span className="text-[#29397E] text-sm">
                    {chaletDetails?.noOfLoyalityPoints} Points
                  </span>
                </div>
              </>
            )}

            <div className="bg-[#FCE7F3] rounded-lg py-1 px-1.5 my-3">
             <p className="text-[10px] text-[#EC4899] leading-relaxed">
              {lang === 'en'
                ? 'A refundable security deposit of 200 KWD is required. This amount will be held and returned within 72 hours after checkout if no damage is reported.'
                : 'مطلوب وديعة تأمين قابلة للاسترداد بقيمة 200 د.ك. سيتم الاحتفاظ بالمبلغ وإرجاعه خلال 72 ساعة بعد تسجيل الخروج إذا لم يتم الإبلاغ عن أي أضرار.'}
            </p>
            </div>

            <div className="space-y-3 text-sm pt-2 !text-[#19191A]">
              {selectedAddons?.map((selectedAddon, index) => (
                <PriceRowUI
                  key={index}
                  label={selectedAddon?.title}
                  amount={
                    (selectedAddon?.cost ?? 0) * (Number(selectedAddon?.selectedQuantity) ?? 1) +
                    ' KWD'
                  }
                />
              ))}
              {/* <PriceRowUI label="Refundable Deposit" amount="200 KWD" /> */}
              {romanticWeekend && <PriceRowUI label="Romantic Weekend" amount="25 KWD" />}
              <PriceRowUI
                label={'Package Amount'}
                amount={`${Number(packageAmount)} KWD`}
                labelFont="medium"
              />
              <hr className="my-4" />
              {isDiscountApplied && (
                <div className="flex justify-between items-center text-sm text-[#9EA0A2] line-through">
                  <span>Original Total</span>
                  <span>{grandTotal} KWD</span>
                </div>
              )}
              <PriceRowUI
                label={isDiscountApplied ? 'Discounted Total' : 'Total'}
                amount={`${isDiscountApplied ? discountedTotal : grandTotal} KWD`}
                labelFont="medium"
              />
            </div>

            <p className={`flex items-center mb-2 mt-4 ${textStyles.body} self-stretch`}>
              {lang === 'en'
                ? 'Deposit will be returned after your stay, subject to property condition.'
                : 'سيتم إرجاع الوديعة بعد إقامتك، حسب حالة العقار.'}
            </p>

            {paidAmount && (
              <div className="font-medium text-base leading-[150%] flex items-center justify-between gap-2 py-2 text-[#29397E]">
                <span>{lang === 'en' ? 'Paid Amount' : 'المبلغ المدفوع'}</span>
                <span>{paidAmount} KWD</span>
              </div>
            )}

            {remaingAmount && (
              <div className="font-medium text-base leading-[150%] flex items-center justify-between gap-2 py-2 text-[#29397E]">
                <span>{lang === 'en' ? 'Remaining Balance' : 'الرصيد المتبقي'}</span>
                <span>{remaingAmount} KWD</span>
              </div>
            )}

            {isSplitPayment && (
              <PaymentSplitSection
                finalFullAmount={isDiscountApplied ? discountedTotal : grandTotal}
              />
            )}

            {showRedeemeCodeSection && (
              <CouponSection
                onChange={(value: string) => {
                  setDiscountCode(value)
                  setIsDiscountApplied(false)
                  setDiscountedTotal(null)
                }}
                onApply={handleApplyDiscount}
                isDisabled={!discountCode || isDiscountApplied}
                value={discountCode}
              />
            )}

            {showBookButton && (
              <Button
                className="w-full text-white mt-3.5 !px-0 rounded-lg font-medium cursor-pointer"
                onClick={bookNow}
                loading={loading}
                disabled={loading}
              >
              {isSplitPayment
                ? lang === 'en'
                  ? 'Book Now with 50% Payment'
                  : 'احجز الآن مع 50٪ دفعة'
                : lang === 'en'
                ? 'Book Now'
                : 'احجز الآن'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {finalPayment && (
     <p className="italic font-normal text-base leading-[19px] text-[#9EA0A2] w-full max-w-[390px] py-4">
      {lang === 'en'
        ? 'This is your final payment. Once completed, your booking will be fully secured.'
        : 'هذه هي الدفعة النهائية الخاصة بك. بمجرد إكمالها، سيتم تأمين حجزك بالكامل.'}
    </p>
      )}
      {loading && <OverlayLoader open={loading} />}
    </>
  )
}

export default BookingSummary
