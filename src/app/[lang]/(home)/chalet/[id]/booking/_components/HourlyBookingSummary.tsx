'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Deposit from '../../../../../../../../public/images/Deposit.svg'
import { useParams, useRouter } from 'next/navigation'

import useToggle from '@/lib/hooks/useToggle'
import { format, addDays, isAfter, isBefore, isEqual } from 'date-fns'
import { capitalizeWords } from '@/lib/utils'
import { Bookings, Chalet } from '../../../../../../../../types/chalets'
import { useBookingStore } from '../../../../../../../../stores/useBookingStore'
import SimpleCalendar from '@/components/Calender/SimpleCalender'
import CustomPopOver from '@/components/CustomPopOver'
import { Button } from '@/components'
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

interface HourlyBookingSummaryProps {
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
  }
  bookings: Bookings
  chalet: Chalet | null
}

// Package types enum for better type safety
enum PackageType {
  WEEKEND = 'weekend',
  WEEKDAY = 'weekday',
  FULL_WEEK = 'full_week',
  FULL_MONTH = 'full_month',
}

const HourlyBookingSummary: React.FC<HourlyBookingSummaryProps> = ({
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
  bookings,
  chalet,
}) => {
  const checkInPopUp = useToggle()
  const checkOutPopUp = useToggle()
  const datePopUp = useToggle()

  const router = useRouter()
  const [selectedPackageType, setSelectedPackageType] = useState<PackageType | null>(null)
  const nights = 123
  const { id } = useParams()
  const {
    selectedPlan,
    guests,
    selectedDates,
    setPackageAmount,
    setGuests,
    setDates,
    setChaletDetails,
  } = useBookingStore()

  const handleQuantityChange = (newQuantity: number) => {
    if (maxGuests && newQuantity > 0 && newQuantity <= +maxGuests) {
      setGuests(newQuantity)
    }
  }
  // Helper function to check if a date is within any booking period
  const isDateBooked = (date: Date): boolean => {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)

      return (
        (isAfter(date, bookingStart) || isEqual(date, bookingStart)) && isBefore(date, bookingEnd)
      )
    })
  }
  // Enhanced date filtering for non-package bookings
  const getNonPackageDisabledDates = useMemo(() => {
    if (selectedPackageType || selectedPlan?.id) return []

    const disabledDates: Date[] = []
    const today = new Date()
    const endDate = addDays(today, 365)

    // Add all dates that are already booked
    for (let date = new Date(today); date <= endDate; date = addDays(date, 1)) {
      if (isDateBooked(date)) {
        disabledDates.push(new Date(date))
      }
    }

    return disabledDates
  }, [bookings])

  const total = 0

  const isDateDisabled = (date: Date, disabledDates: Date[]): boolean => {
    const dateStr = date.toISOString().split('T')[0]
    return disabledDates.some((disabledDate: Date) => {
      const disabledStr = new Date(disabledDate).toISOString().split('T')[0]
      return dateStr === disabledStr
    })
  }

  return (
    <div className="bg-[#F9FAFB] rounded-2xl">
      <div className="sm:p-5 p-4 !pb-4">
        <h3 className="font-bold xl:text-[20px] md:text-lg text-[16px] leading-[24px] text-[#19191A] pb-3">
          Choose Your Package
        </h3>
        {selectedPackageType && (
          <h2 className="lg:text-[20px] md:text-[16px] text-sm leading-6 font-normal text-[#19191A] flex items-center">
            {100 + ' KWD'}
            <span className="text-[16px]">
              / {capitalizeWords(selectedPackageType?.split('_')?.join(' '))}
            </span>
          </h2>
        )}
      </div>

      <div className="px-5 py-3">
        <div className="w-full rounded-xl border border-[#D1D5DB] overflow-hidden text-sm text-[#19191A]">
          <div className="p-3">
            <CustomPopOver
              isOpen={datePopUp.isOpen}
              onClose={datePopUp.toggle}
              triggerChildren={
                <span className="cursor-pointer">
                  <span className="block text-[10px] font-semibold">CHECKOUT</span>
                  <span className="block text-[14px] text-[#9EA0A2]">
                    {format(new Date(selectedDates?.checkOut), 'dd/MM/yyyy')}
                  </span>
                </span>
              }
            >
              <SimpleCalendar
                initialDate={
                  selectedDates?.checkOut
                    ? new Date(selectedDates.checkOut)
                    : (() => {
                        const tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        return tomorrow
                      })()
                }
                minDate={(() => {
                  if (selectedDates?.checkIn) {
                    const minCheckOut = new Date(selectedDates.checkIn)
                    minCheckOut.setDate(minCheckOut.getDate() + 1)
                    return minCheckOut
                  }
                  const tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  return tomorrow
                })()}
                disabledDates={getNonPackageDisabledDates}
                isDateSelectable={(date: Date): boolean => {
                  if (isDateDisabled(date, getNonPackageDisabledDates)) {
                    return false
                  }

                  return true
                }}
                onDateChange={(selectedDate: Date): void => {
                  const checkInDate = selectedDates?.checkIn
                    ? new Date(selectedDates.checkIn)
                    : new Date()

                  setDates(checkInDate, selectedDate)
                  datePopUp.toggle()
                }}
              />
            </CustomPopOver>
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#D1D5DB]">
            <div className="p-3">
              <CustomPopOver
                isOpen={checkInPopUp.isOpen}
                onClose={checkInPopUp.toggle}
                triggerChildren={
                  <span className="cursor-pointer">
                    <span className="block text-[10px] font-semibold">CHECK-IN</span>
                    <span className="block text-[14px] text-[#9EA0A2]">
                      {format(new Date(selectedDates?.checkIn), 'dd/MM/yyyy')}
                    </span>
                  </span>
                }
              >
                <div>check in time picker here </div>
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
                      {format(new Date(selectedDates?.checkOut), 'dd/MM/yyyy')}
                    </span>
                  </span>
                }
              >
                <div>check out time picker here </div>
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
        <Button
          className={'w-[100%] mb-5 text-white py-2 rounded-lg font-medium cursor-pointer'}
          onClick={() => {
            setPackageAmount(total)

            setChaletDetails(chalet)
            router.push(`/chalet/${id}/booking`)
          }}
        >
          Book Now
        </Button>
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
        {!selectedPackageType && !selectedPlan?.id && (
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-normal text-[#19191A] flex items-center">
              {bookingConfig.currency} × {nights} night
              {nights > 1 ? 's' : ''}
            </span>
            <span className="font-normal text-[16px] text-[#19191A]">
              {0 * nights} {bookingConfig.currency}
            </span>
          </div>
        )}
        {selectedPackageType && (
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-normal text-[#19191A] flex items-center">
              {capitalizeWords(selectedPackageType?.split('_')?.join(' '))}
            </span>
            <span className="font-normal text-[16px] text-[#19191A]">{100 + ' KWD'}</span>
          </div>
        )}
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
              {total} {bookingConfig.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HourlyBookingSummary
