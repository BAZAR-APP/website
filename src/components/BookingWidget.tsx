'use client'
import React from 'react'
import { Radio } from '@radix-ui/themes'
import Image from 'next/image'
import Deposit from '../../public/images/Deposit.svg'
import Button from './Button/Button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useBookingStore } from '../../stores/useBookingStore'
import CustomPopOver from './CustomPopOver'
import SimpleCalender from './Calender/SimpleCalender'
import useToggle from '@/lib/hooks/useToggle'

interface PackageOption {
  id: string
  label: string
  basePrice: number
  weekendPrice: number
  weekdayPrice: number
  fullWeekPrice: number
  fullMonthPrice: number
}

interface BookingConfig {
  refundableDeposit: number
  currency: string
  paymentOptions: {
    partialPayment: boolean
    partialPercentage: number
    fullPaymentUpfront: boolean
  }
  refundPolicy: {
    depositAmount: number
    refundTimeframe: number
    currency: string
  }
}

interface BookingWidgetProps {
  checkIn?: Date | undefined
  setCheckIn?: (date: Date | undefined) => void
  checkOut?: Date | undefined
  setCheckOut?: (date: Date | undefined) => void
  guests?: number
  setGuests?: (guests: number) => void
  maxGuests?: string
  packageOptions?: PackageOption[]
  bookingConfig?: BookingConfig
  packageInfo: {
    perHourCost: number | undefined
    perNightCost: number | undefined
    weekendCost: number | undefined
    weekDaysCost: number | undefined
    fullWeekCost: number | undefined
    fullMonthCost: number | undefined
  }
}

const PricingRow = ({
  title,
  subtitle,
  price,
  currency,
  checked,
  disabled = false,
}: {
  title: string
  subtitle: string
  price: number | undefined
  currency: string
  checked?: boolean
  disabled?: boolean
}) => (
  <div className="flex justify-between items-center">
    <div>
      <h3 className="text-sm leading-4 font-normal text-[#19191A] flex items-center">{title}</h3>
      <p className="text-[10px] leading-4 font-normal text-[#9EA0A2] flex items-center">
        {subtitle}
      </p>
    </div>
    <span className="text-sm leading-[17px] font-medium text-[#19191A] flex gap-2 items-center">
      {price} {currency}
      <Radio
        name="example"
        value=""
        defaultChecked={false}
        className="!cursor-pointer"
        disabled={disabled}
      />
    </span>
  </div>
)

const BookingWidget: React.FC<BookingWidgetProps> = ({
  checkIn,
  checkOut,
  packageOptions = [],
  bookingConfig = {
    refundableDeposit: 200,
    currency: 'KWD',
    paymentOptions: {
      partialPayment: false,
      partialPercentage: 0,
      fullPaymentUpfront: true,
    },
    refundPolicy: {
      depositAmount: 0,
      refundTimeframe: 0,
      currency: 'KWD',
    },
  },
  packageInfo,
  maxGuests,
}) => {
  const checkInPopUp = useToggle()
  const checkOutPopUp = useToggle()

  const { id } = useParams()
  const { selectedPlan, selectedRoom, guests, setGuests, setDates, selectedDates } =
    useBookingStore()

  const handleQuantityChange = (newQuantity: number) => {
    if (maxGuests && newQuantity > 0 && newQuantity <= +maxGuests) {
      setGuests(newQuantity)
    }
  }

  const selectedPackage = packageOptions[0]?.label || '100 KWD / night'

  const currentPackage =
    packageOptions.find((pkg) => pkg.label === selectedPackage) || packageOptions[0]

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime()
      return Math.ceil(diffTime / (1000 * 3600 * 24))
    }
    return 4
  }

  const nights = calculateNights()
  const formatDate = (date?: Date) => {
    if (!date) return 'Select date'
    const modifiedDate = new Date(date)
    const day = modifiedDate.getDate().toString().padStart(2, '0')
    const month = (modifiedDate.getMonth() + 1).toString().padStart(2, '0')
    const year = modifiedDate.getFullYear()

    return `${day}/${month}/${year}`
  }
  const total = (currentPackage?.basePrice ?? 0) * nights + bookingConfig.refundableDeposit

  return (
    <div className="bg-[#F9FAFB] rounded-2xl">
      <div className="sm:p-5 p-4 !pb-4">
        <h3 className="font-bold xl:text-[20px] md:text-lg text-[16px] leading-[24px] text-[#19191A] pb-3">
          Choose Your Package
        </h3>
        <h2 className="lg:text-[20px] md:text-[16px] text-sm leading-6 font-normal text-[#19191A] flex items-center">
          {selectedPackage.split('/')[0]}
          <span className="text-[16px]">/ {selectedPackage.split('/')[1]}</span>
        </h2>
      </div>
      <div className="px-6 space-y-3">
        {packageInfo && (
          <>
            <PricingRow
              title="Weekend"
              subtitle="Thursday to Saturday"
              price={packageInfo.weekendCost}
              currency={bookingConfig.currency}
              disabled={!!selectedPlan?.id}
            />
            <PricingRow
              title="Weekday"
              subtitle="Friday to Wednesday"
              price={packageInfo.weekDaysCost}
              currency={bookingConfig.currency}
              disabled={!!selectedPlan?.id}
            />
            <PricingRow
              title="Full Week"
              subtitle="7 consecutive nights"
              price={packageInfo.fullWeekCost}
              currency={bookingConfig.currency}
              disabled={!!selectedPlan?.id}
            />
            <PricingRow
              title="Full Month"
              subtitle="30 consecutive nights"
              price={packageInfo.fullMonthCost}
              currency={bookingConfig.currency}
              disabled={!!selectedPlan?.id}
            />
          </>
        )}
      </div>
      <div className="px-5 py-3">
        <div className="w-full rounded-xl border border-[#D1D5DB] overflow-hidden text-sm text-[#19191A]">
          <div className="grid grid-cols-2 divide-x divide-[#D1D5DB]">
            <div className="p-3">
              <CustomPopOver
                isOpen={checkInPopUp.isOpen}
                onClose={checkInPopUp.toggle}
                triggerChildren={
                  <span className="cursor-pointer">
                    <span className="block text-[10px] font-semibold">CHECK-IN</span>
                    <span className="block text-[14px] text-[#9EA0A2]">
                      {formatDate(selectedDates?.checkIn)}
                    </span>
                  </span>
                }
              >
                <SimpleCalender
                  initialDate={selectedDates?.checkIn || new Date()}
                  minDate={new Date()}
                  onDateChange={(selectedDate: Date) => {
                    setDates(selectedDate, selectedDates?.checkOut || new Date())
                    checkInPopUp.toggle()
                  }}
                />
              </CustomPopOver>
            </div>
            <div className="p-3">
              <CustomPopOver
                isOpen={checkOutPopUp.isOpen}
                onClose={checkOutPopUp.toggle}
                triggerChildren={
                  <span className="cursor-pointer">
                    <span className="block text-[10px] font-semibold">CHECKOUT</span>
                    <span className="block text-[14px] text-[#9EA0A2]">
                      {formatDate(selectedDates?.checkOut)}
                    </span>
                  </span>
                }
              >
                <SimpleCalender
                  initialDate={selectedDates?.checkOut || new Date()}
                  minDate={new Date()}
                  onDateChange={(selectedDate: Date) => {
                    setDates(selectedDates?.checkIn || new Date(), selectedDate)
                    checkOutPopUp.toggle()
                  }}
                />
              </CustomPopOver>
            </div>
          </div>
          <div className="border-t border-[#D1D5DB] px-3 py-2 flex items-center justify-between cursor-pointer">
            <div>
              <span className="block text-[10px] font-semibold">GUESTS</span>
              {guests && <span className="block text-[14px] text-[#9EA0A2]">{guests} guests</span>}
            </div>
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => handleQuantityChange(guests - 1)}
                className="flex cursor-pointer w-8 h-8 justify-center items-center relative p-[6.4px] rounded-[80px] border-[0.8px] border-solid border-[#E5E5EA]"
                aria-label="Decrease quantity"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M14.7997 10H5.19971"
                    stroke="#19191A"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-[#19191A] text-base font-medium leading-6">{guests}</span>
              <button
                onClick={() => handleQuantityChange(guests + 1)}
                className="cursor-pointer flex w-8 h-8 justify-center items-center relative p-[6.4px] rounded-[80px] border-[0.8px] border-solid border-[#E5E5EA]"
                aria-label="Increase quantity"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10.0002 5.19995V9.99995M10.0002 9.99995V14.8M10.0002 9.99995H14.8002M10.0002 9.99995L5.2002 9.99995"
                    stroke="#19191A"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">
        <Link href={`/chalet/${id}/booking`}>
          <Button className="w-[100%] mb-5 text-white py-2 rounded-lg font-medium cursor-pointer">
            Book Now
          </Button>
        </Link>
      </div>
      {bookingConfig.paymentOptions.partialPayment && (
        <div className="px-5 pb-4">
          <p className="text-sm leading-4 font-normal text-[#9EA0A2]">
            You can choose to pay {bookingConfig.paymentOptions.partialPercentage}% now and the
            remaining 72 hours before check-in, or pay the full amount upfront.
          </p>
        </div>
      )}
      <div className="px-4.5 pb-6">
        <div className="bg-[#FCE7F3] rounded-lg py-1 px-1.5">
          <p className="text-[10px] text-[#EC4899] leading-relaxed">
            A refundable security deposit of {bookingConfig.refundPolicy.depositAmount}{' '}
            {bookingConfig.refundPolicy.currency} is required. This amount will be held and returned
            within {bookingConfig.refundPolicy.refundTimeframe} hours after checkout if no damage is
            reported.
          </p>
        </div>
      </div>
      <div className="px-5 pb-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[16px] font-normal text-[#19191A] flex items-center">
            {currentPackage?.basePrice ?? 0} {bookingConfig.refundPolicy.currency} × {nights} night
            {nights > 1 ? 's' : ''}
          </span>
          <span className="font-normal text-[16px] text-[#19191A]">
            {(currentPackage?.basePrice ?? 0) * nights} {bookingConfig.currency}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-[16px] font-normal text-[#19191A] flex items-center">
              Refundable Deposit
            </span>
            <div className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center">
              <Image src={Deposit} width={15} height={15} alt="Deposit icon" />
            </div>
          </div>
          <span className="font-normal text-[16px] text-[#19191A]">
            {bookingConfig.refundableDeposit} {bookingConfig.currency}
          </span>
        </div>

        <div className="border-t border-[#DEDEDF] pt-3">
          <div className="flex justify-between items-center font-medium text-[16px] text-[#19191A]">
            <span>Total</span>
            <span>
              {total} {bookingConfig.refundPolicy.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingWidget
