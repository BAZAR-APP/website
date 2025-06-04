import React from 'react'
import { MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button/Button'
import CommonInput from './CommonInput/Input'
import { priceDetails } from '@/lib/constant'
import { useFormContext } from 'react-hook-form'
import PriceRowUI from './PriceRow'
import RedeemRewards from './Booking/RedeemRewards'

// Extracted common text styles
const textStyles = {
  body: 'text-[14px] font-normal leading-[17px] text-[#9EA0A2] font-inter',
  price: 'text-[16px] leading-[150%] font-medium',
  primaryBlue: 'primary-blue',
  darkText: 'text-[#19191A]',
}

// Extracted payment split section component
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

// Extracted coupon section component
const CouponSection: React.FC = () => (
  <>
    <CommonInput
      name="redeemCode"
      type="text"
      onChange={() => {}}
      placeholder="Apply redeemed code here"
      className={'!bg-[#F9FAFB] !text-[#484A4C] my-1 !rounded-[8px] !border-none !h-[42px]'}
    />
    <RedeemRewards />
  </>
)

type BookingSummaryProps = {
  showBookButton?: boolean
  couponCode?: boolean
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  showBookButton = false,
  couponCode = false,
}) => {
  const { getValues, watch } = useFormContext()
  const romanticWeekend = watch('romanticWeekend')

  const isSplitPayment = getValues()?.paymentOption === 'split'

  return (
    <div className="w-full md:max-w-sm rounded-lg">
      <div className="p-0">
        <div className="relative">
          <Image
            src="https://picsum.photos/200/300"
            alt="Luxury Lakeside Retreat"
            width={200}
            height={200}
            className="w-full h-46 object-cover rounded-lg"
          />
        </div>

        <div className="py-3">
          <div className="flex items-start flex-wrap justify-between mb-3">
            <h3 className="text-[16px] leading-[24px] font-medium text-[#19191A] font-inter">
              Luxury Lakeside Retreat
            </h3>
            <div className="flex items-center text-sm text-[#8E8E93]">
              <MapPin size={16} className="mr-1" />
              Al Khiran
            </div>
          </div>

          <div className={`flex items-center mb-3 ${textStyles.body}`}>
            <Calendar size={16} className="mr-2" />
            From 20 March 2025 to 24 March 2025
          </div>

          <div className="text-sm text-[#9EA0A2] mb-3">
            You'll earn 200 points with this booking!
          </div>

          <div className="flex bg-[#E1F3FF] items-center justify-between gap-1 rounded py-1 px-1.5 max-w-[101px]">
            <Image src={'/images/Points.svg'} width={16} height={16} alt="Points-Icon" />
            <span className="text-[#29397E] text-sm">200 Points</span>
          </div>

          <div className="bg-[#FCE7F3] rounded-lg py-1 px-1.5 my-3">
            <p className="text-[10px] text-[#EC4899] leading-relaxed">
              A refundable security deposit of 200 KWD is required. This amount will be held and
              returned within 72 hours after checkout if no damage is reported.
            </p>
          </div>

          <div className="space-y-3 text-sm pt-2">
            {priceDetails.map(({ label, amount }) => (
              <PriceRowUI key={label} label={label} amount={amount} />
            ))}
            {romanticWeekend && <PriceRowUI label={'Romantic Weekend'} amount={'25 KWD'} />}
            <hr className="my-4" />

            <PriceRowUI label={'Total'} amount={'420 KWD'} labelFont="medium" />
          </div>

          <p className={`flex items-center mb-2 mt-4 ${textStyles.body} self-stretch`}>
            Deposit will be returned after your stay, subject to property condition.
          </p>

          {isSplitPayment && <PaymentSplitSection />}

          {couponCode && <CouponSection />}

          {showBookButton && (
            <Link href="/explore/details/payment-confirmed/">
              <Button className="w-[100%] mb-5 text-white my-3.5 rounded-lg font-medium cursor-pointer">
                {isSplitPayment ? 'Book Now with 50% Payment' : 'Book Now'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingSummary
