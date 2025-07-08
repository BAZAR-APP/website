'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Radio } from '@radix-ui/themes'
import Image from 'next/image'
import Deposit from '../../public/images/Deposit.svg'
import Button from './Button/Button'
import { useParams, useRouter } from 'next/navigation'
import { useBookingStore } from '../../stores/useBookingStore'
import CustomPopOver from './CustomPopOver'
import SimpleCalender from './Calender/SimpleCalender'
import useToggle from '@/lib/hooks/useToggle'
import {
  format,
  addDays,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  startOfDay,
  endOfDay,
} from 'date-fns'
import { capitalizeWords } from '@/lib/utils'
import { Bookings, Chalet } from '../../types/chalets'

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

const PricingRow = ({
  title,
  subtitle,
  price,
  currency,
  checked,
  disabled = false,
  onSelect,
  packageType,
}: {
  title: string
  subtitle: string
  price: number | undefined
  currency: string
  checked?: boolean
  disabled?: boolean
  onSelect: (packageType: PackageType) => void
  packageType: PackageType
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
        name="package"
        value={packageType}
        checked={checked}
        onChange={() => onSelect(packageType)}
        className={disabled ? 'cursor-not-allowed' : '!cursor-pointer'}
        disabled={disabled}
      />
    </span>
  </div>
)

const BookingWidget: React.FC<BookingWidgetProps> = ({
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
  const router = useRouter()
  const [selectedPackageType, setSelectedPackageType] = useState<PackageType | null>(null)

  const { id } = useParams()
  const {
    selectedPlan,
    guests,
    selectedDates,
    setNoOfNights,
    setPackageAmount,
    setTotalCostAgainstNights,
    setGuests,
    setDates,
    setChaletDetails,
  } = useBookingStore()

  // Helper function to check if a date range overlaps with existing bookings
  const hasBookingConflict = (startDate: Date, endDate: Date): boolean => {
    const rangeStart = startOfDay(startDate)
    const rangeEnd = endOfDay(endDate)

    return bookings.some((booking) => {
      const bookingStart = startOfDay(new Date(booking.startDate))
      const bookingEnd = endOfDay(new Date(booking.endDate))

      return rangeStart <= bookingEnd && rangeEnd >= bookingStart
    })
  }

  // Helper function to check if a specific package period has conflicts
  const hasPackageConflict = (checkInDate: Date, packageType: PackageType): boolean => {
    const checkOutDate = getSuggestedCheckOutForPackage(checkInDate, packageType)
    return hasBookingConflict(checkInDate, checkOutDate)
  }

  // Helper function to get suggested checkout date for a package
  const getSuggestedCheckOutForPackage = (checkInDate: Date, packageType: PackageType): Date => {
    const checkInDay = checkInDate.getDay()

    switch (packageType) {
      case PackageType.WEEKEND:
        if (checkInDay === 4) return addDays(checkInDate, 2) // Thursday to Sunday
        if (checkInDay === 5) return addDays(checkInDate, 2) // Friday to Sunday
        if (checkInDay === 6) return addDays(checkInDate, 1) // Saturday to Sunday
        return addDays(checkInDate, 3) // Fallback
      case PackageType.WEEKDAY:
        return addDays(checkInDate, 5) // Friday to Wednesday
      case PackageType.FULL_WEEK:
        return addDays(checkInDate, 7)
      case PackageType.FULL_MONTH:
        return addDays(checkInDate, 30)
      default:
        return addDays(checkInDate, 1)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (maxGuests && newQuantity > 0 && newQuantity <= +maxGuests) {
      setGuests(newQuantity)
    }
  }

  const handlePackageSelect = (packageType: PackageType) => {
    setSelectedPackageType(packageType)
    // Reset dates when package changes
    setDates(new Date(), new Date())
  }

  // Calendar date filtering logic based on selected package and bookings
  const getDateRestrictions = useMemo(() => {
    if (!selectedPackageType)
      return { isDateDisabled: () => false, getSuggestedCheckOut: () => addDays(new Date(), 1) }

    const isDateDisabled = (date: Date) => {
      const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, etc.

      // First, check day-of-week restrictions for the package type
      let isDayRestricted = false
      switch (selectedPackageType) {
        case PackageType.WEEKEND:
          // Weekend: Thursday to Saturday (Thu=4, Fri=5, Sat=6)
          isDayRestricted = ![4, 5, 6].includes(dayOfWeek)
          break
        case PackageType.WEEKDAY:
          // Weekday: Friday to Wednesday (Fri=5)
          isDayRestricted = dayOfWeek !== 5
          break
        case PackageType.FULL_WEEK:
        case PackageType.FULL_MONTH:
          // Full week/month: any day is allowed for check-in
          isDayRestricted = false
          break
        default:
          isDayRestricted = false
      }

      // If the day is restricted by package type, disable it
      if (isDayRestricted) return true

      // Then check if this date would conflict with existing bookings
      return hasPackageConflict(date, selectedPackageType)
    }

    const getSuggestedCheckOut = (checkInDate: Date) => {
      return getSuggestedCheckOutForPackage(checkInDate, selectedPackageType)
    }

    return { isDateDisabled, getSuggestedCheckOut }
  }, [selectedPackageType, bookings])

  // Get package description for checkout info
  const getPackageDescription = () => {
    switch (selectedPackageType) {
      case PackageType.WEEKEND:
        return 'Weekend package - checkout on Sunday'
      case PackageType.WEEKDAY:
        return 'Weekday package - checkout on Wednesday'
      case PackageType.FULL_WEEK:
        return '7 nights - fixed duration'
      case PackageType.FULL_MONTH:
        return '30 nights - fixed duration'
      default:
        return ''
    }
  }

  const getDisabledDatesArray = useMemo(() => {
    if (!selectedPackageType) return []

    const disabledDates: Date[] = []
    const today = new Date()
    const endDate = addDays(today, 365) // Check next 365 days

    for (let date = new Date(today); date <= endDate; date = addDays(date, 1)) {
      if (getDateRestrictions.isDateDisabled(date)) {
        disabledDates.push(new Date(date))
      }
    }

    return disabledDates
  }, [selectedPackageType, getDateRestrictions])

  const firstEnabledDate = useMemo(() => {
    if (!selectedPackageType) return null

    const today = new Date()
    const endDate = addDays(today, 365)

    for (let date = new Date(today); date <= endDate; date = addDays(date, 1)) {
      const isDisabled = getDisabledDatesArray.some((disabled) => isSameDay(disabled, date))

      if (!isDisabled) {
        return date
      }
    }

    return null
  }, [selectedPackageType, getDisabledDatesArray, selectedPlan])

  // Helper function to check if a date is within any booking period
  const isDateBooked = (date: Date): boolean => {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)

      // Check if date is within booking period (inclusive of start, exclusive of end)
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
  }, [selectedPackageType, selectedPlan?.id, bookings])

  // Get disabled dates for checkout calendar (non-package bookings)
  const getCheckoutDisabledDates = useMemo(() => {
    if (selectedPackageType || selectedPlan?.id) return []

    const disabledDates: Date[] = []
    const today = new Date()
    const endDate = addDays(today, 365)
    const checkInDate = selectedDates?.checkIn ? new Date(selectedDates.checkIn) : today

    // For checkout, we need to disable dates that would create conflicts
    for (let date = new Date(today); date <= endDate; date = addDays(date, 1)) {
      // Skip dates before check-in
      if (isBefore(date, checkInDate) || isEqual(date, checkInDate)) {
        disabledDates.push(new Date(date))
        continue
      }

      // Check if selecting this checkout date would conflict with any booking
      if (hasBookingConflict(checkInDate, date)) {
        disabledDates.push(new Date(date))
      }
    }

    return disabledDates
  }, [selectedPackageType, selectedPlan?.id, selectedDates?.checkIn, bookings])

  const calculateNights = () => {
    if (selectedDates?.checkIn && selectedDates?.checkOut) {
      const checkInDate = new Date(selectedDates.checkIn)
      const checkOutDate = new Date(selectedDates.checkOut)
      const diffTime = checkOutDate.getTime() - checkInDate.getTime()
      return Math.ceil(diffTime / (1000 * 3600 * 24))
    }
    return getDefaultNights()
  }

  const getDefaultNights = () => {
    switch (selectedPackageType) {
      case PackageType.WEEKEND: {
        if (selectedDates?.checkIn && selectedDates?.checkOut) {
          const checkInDate = new Date(selectedDates.checkIn)
          const checkOutDate = new Date(selectedDates.checkOut)
          const diffTime = checkOutDate.getTime() - checkInDate.getTime()
          return Math.ceil(diffTime / (1000 * 3600 * 24))
        }
        return 3 // Default fallback
      }
      case PackageType.WEEKDAY: {
        if (selectedDates?.checkIn && selectedDates?.checkOut) {
          const checkInDate = new Date(selectedDates.checkIn)
          const checkOutDate = new Date(selectedDates.checkOut)
          const diffTime = checkOutDate.getTime() - checkInDate.getTime()
          return Math.ceil(diffTime / (1000 * 3600 * 24))
        }
        return 5 // Default fallback
      }
      case PackageType.FULL_WEEK:
        return 7
      case PackageType.FULL_MONTH:
        return 30
      default:
        return 1
    }
  }

  const getCurrentPrice = () => {
    switch (selectedPackageType) {
      case PackageType.WEEKEND:
        return packageInfo.weekendCost || 0
      case PackageType.WEEKDAY:
        return packageInfo.weekDaysCost || 0
      case PackageType.FULL_WEEK:
        return packageInfo.fullWeekCost || 0
      case PackageType.FULL_MONTH:
        return packageInfo.fullMonthCost || 0
      default:
        return 0
    }
  }

  const nights = calculateNights()
  const currentPrice = getCurrentPrice()

  const total =
    (selectedPlan?.id
      ? Number(selectedPlan?.price)
      : selectedPackageType
        ? currentPrice
        : nights * (packageInfo?.perNightCost || 0)) + bookingConfig.refundableDeposit

  useEffect(() => {
    if (selectedPlan?.id) {
      setSelectedPackageType(selectedPlan?.type?.toLocaleLowerCase() as PackageType)
      setDates(new Date(), new Date())
    } else {
      setSelectedPackageType(null)
      setDates(new Date(), new Date())
    }
  }, [selectedPlan])
  useEffect(() => {
    if (firstEnabledDate) {
      const suggestedCheckOut = getDateRestrictions.getSuggestedCheckOut(firstEnabledDate)
      setDates(firstEnabledDate, suggestedCheckOut)
    }
  }, [firstEnabledDate])
  return (
    <div className="bg-[#F9FAFB] rounded-2xl">
      <div className="sm:p-5 p-4 !pb-4">
        <h3 className="font-bold xl:text-[20px] md:text-lg text-[16px] leading-[24px] text-[#19191A] pb-3">
          Choose Your Package
        </h3>
        {selectedPackageType && (
          <h2 className="lg:text-[20px] md:text-[16px] text-sm leading-6 font-normal text-[#19191A] flex items-center">
            {currentPrice + ' KWD'}
            <span className="text-[16px]">
              / {capitalizeWords(selectedPackageType?.split('_')?.join(' '))}
            </span>
          </h2>
        )}
      </div>

      <div className="px-6 space-y-3">
        {packageInfo && (
          <>
            <PricingRow
              title="Weekend"
              subtitle="Thursday to Saturday"
              price={packageInfo.weekendCost}
              currency={bookingConfig.currency}
              checked={!selectedPlan?.id && selectedPackageType === PackageType.WEEKEND}
              disabled={!!selectedPlan?.id}
              onSelect={handlePackageSelect}
              packageType={PackageType.WEEKEND}
            />
            <PricingRow
              title="Weekday"
              subtitle="Friday to Wednesday"
              price={packageInfo.weekDaysCost}
              currency={bookingConfig.currency}
              checked={!selectedPlan?.id && selectedPackageType === PackageType.WEEKDAY}
              disabled={!!selectedPlan?.id}
              onSelect={handlePackageSelect}
              packageType={PackageType.WEEKDAY}
            />
            <PricingRow
              title="Full Week"
              subtitle="7 consecutive nights"
              price={packageInfo.fullWeekCost}
              currency={bookingConfig.currency}
              checked={!selectedPlan?.id && selectedPackageType === PackageType.FULL_WEEK}
              disabled={!!selectedPlan?.id}
              onSelect={handlePackageSelect}
              packageType={PackageType.FULL_WEEK}
            />
            <PricingRow
              title="Full Month"
              subtitle="30 consecutive nights"
              price={packageInfo.fullMonthCost}
              currency={bookingConfig.currency}
              checked={!selectedPlan?.id && selectedPackageType === PackageType.FULL_MONTH}
              disabled={!!selectedPlan?.id}
              onSelect={handlePackageSelect}
              packageType={PackageType.FULL_MONTH}
            />
          </>
        )}
      </div>

      {selectedPackageType && (
        <div className="px-5 py-2">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              {selectedPackageType === PackageType.WEEKEND &&
                'Weekend Package: Select Thursday, Friday, or Saturday. Check-out is automatically set for Sunday.'}
              {selectedPackageType === PackageType.WEEKDAY &&
                'Weekday Package: Select Friday for check-in. Check-out is automatically set for Wednesday (5 nights).'}
              {selectedPackageType === PackageType.FULL_WEEK &&
                'Full Week Package: Select any date for a 7-night stay. Check-out is automatically set.'}
              {selectedPackageType === PackageType.FULL_MONTH &&
                'Full Month Package: Select any date for a 30-night stay. Check-out is automatically set.'}
            </p>
          </div>
        </div>
      )}

      <div className="px-5 py-3">
        <div className="w-full rounded-xl border border-[#D1D5DB] overflow-hidden text-sm text-[#19191A]">
          {selectedPackageType ? (
            <div className="grid grid-cols-2 divide-x divide-[#D1D5DB]">
              <div className="p-3">
                <CustomPopOver
                  isOpen={checkInPopUp.isOpen}
                  onClose={checkInPopUp.toggle}
                  triggerChildren={
                    <span
                      className={`cursor-pointer ${!selectedPackageType && !selectedPlan?.id ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <span className="block text-[10px] font-semibold">CHECK-IN</span>
                      <span className="block text-[14px] text-[#9EA0A2]">
                        {selectedDates?.checkIn
                          ? format(new Date(selectedDates.checkIn), 'dd/MM/yyyy')
                          : 'Select package first'}
                      </span>
                    </span>
                  }
                >
                  <SimpleCalender
                    initialDate={selectedDates?.checkIn || new Date()}
                    minDate={new Date()}
                    disabledDates={getDisabledDatesArray}
                    onDateChange={(selectedDate: Date) => {
                      const suggestedCheckOut =
                        getDateRestrictions.getSuggestedCheckOut(selectedDate)
                      setDates(selectedDate, suggestedCheckOut)
                      checkInPopUp.toggle()
                    }}
                  />
                </CustomPopOver>
              </div>
              <div className="p-3">
                <span className="cursor-default">
                  <span className="block text-[10px] font-semibold">CHECKOUT</span>
                  <span className="block text-[14px] text-[#9EA0A2]">
                    {selectedDates?.checkOut
                      ? format(new Date(selectedDates.checkOut), 'dd/MM/yyyy')
                      : 'Auto-selected'}
                  </span>
                  {selectedPackageType && selectedDates?.checkIn && (
                    <span className="block text-[8px] text-blue-600 mt-1">
                      {getPackageDescription()}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : (
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
                  <SimpleCalender
                    initialDate={selectedDates?.checkIn || new Date()}
                    minDate={new Date()}
                    disabledDates={getNonPackageDisabledDates}
                    onDateChange={(selectedDate: Date) => {
                      // Calculate next day for checkout
                      const nextDay = new Date(selectedDate)
                      nextDay.setDate(nextDay.getDate() + 1)

                      // If current checkout is before or equal to selected check-in, update it
                      const currentCheckOut = selectedDates?.checkOut
                        ? new Date(selectedDates.checkOut)
                        : new Date()
                      const checkOutDate =
                        currentCheckOut <= selectedDate ? nextDay : currentCheckOut

                      setDates(selectedDate, checkOutDate)
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
                        {format(new Date(selectedDates?.checkOut), 'dd/MM/yyyy')}
                      </span>
                    </span>
                  }
                >
                  <SimpleCalender
                    initialDate={
                      selectedDates?.checkOut ||
                      (() => {
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
                    disabledDates={getCheckoutDisabledDates}
                    onDateChange={(selectedDate: Date) => {
                      const checkInDate = selectedDates?.checkIn || new Date()
                      setDates(checkInDate, selectedDate)
                      checkOutPopUp.toggle()
                    }}
                  />
                </CustomPopOver>
              </div>
            </div>
          )}
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
          disabled={
            (!selectedPackageType && !selectedPlan?.id && !nights) ||
            !selectedDates?.checkIn ||
            !selectedDates?.checkOut
          }
          onClick={() => {
            setPackageAmount(total)
            if (!selectedPlan?.id && !selectedPackageType) {
              setNoOfNights(nights)
              setTotalCostAgainstNights(nights * (packageInfo?.perNightCost || 0))
            }
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
              {packageInfo?.perNightCost} {bookingConfig.currency} × {nights} night
              {nights > 1 ? 's' : ''}
            </span>
            <span className="font-normal text-[16px] text-[#19191A]">
              {(packageInfo?.perNightCost || 0) * nights} {bookingConfig.currency}
            </span>
          </div>
        )}
        {selectedPackageType && !selectedPlan?.id && (
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-normal text-[#19191A] flex items-center">
              {capitalizeWords(selectedPackageType?.split('_')?.join(' '))}
            </span>
            <span className="font-normal text-[16px] text-[#19191A]">{currentPrice + ' KWD'}</span>
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

export default BookingWidget
