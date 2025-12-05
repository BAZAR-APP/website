'use client'
import React, { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'

import useToggle from '@/lib/hooks/useToggle'
import { format, addDays, startOfDay, addHours } from 'date-fns'
import { Bookings, Chalet } from '../../../../../../../../types/chalets'
import { useBookingStore } from '../../../../../../../../stores/useBookingStore'
import SimpleCalendar from '@/components/Calender/SimpleCalender'
import CustomPopOver from '@/components/CustomPopOver'
import { Button } from '@/components'
import AddGuests from './AddGuests'
import RefundDepositRules from './RefundDepositRules'
import PackagePricingSummary from './PackagePricingSummary'
import { expandDateRange } from '@/lib/utils'
import { Locale } from '../../../../../../../../i18n.config'

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

interface TimeSlot {
  value: string
  label: string
  hour: number
  isAvailable?: boolean // Make optional for initial generation
  checkoutTime?: string // Make optional for initial generation
  checkoutHour?: number // Make optional for initial generation
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
  availabilities: {
    id: string
    chaletId: string
    startDate: string // e.g., "2025-11-01"
    endDate: string
    isAvailable: boolean
  }[]
  lang: Locale
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
  maxGuests,
  bookings,
  chalet,
  availabilities,
  lang
}) => {
  const checkInPopUp = useToggle()
  const checkOutPopUp = useToggle()
  const datePopUp = useToggle()

  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedCheckInTime, setSelectedCheckInTime] = useState<string | null>(null)
  const [selectedCheckOutTime, setSelectedCheckOutTime] = useState<string | null>(null)

  const { id } = useParams()
  const { setPackageAmount, setDates, setChaletDetails, setBookingType, selectedDates } =
    useBookingStore()

  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = []
    for (let hour = 0; hour < 24; hour++) {
      slots.push({
        value: hour.toString().padStart(2, '0') + ':00',
        label: formatTime(hour, 0),
        hour: hour,
      })
    }
    return slots
  }

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
  }

  const getAvailableTimeSlots = (date: Date): TimeSlot[] => {
    if (!date) return []

    const allSlots = generateTimeSlots()
    const now = new Date()
    const today = startOfDay(now)
    const selectedDay = startOfDay(date)
    const isToday = selectedDay.getTime() === today.getTime()

    // Get all bookings that affect this date and potentially the next day (for overnight bookings)
    const relevantBookings = bookings.filter((booking) => {
      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)
      const checkDate = startOfDay(date)
      const nextDay = addDays(checkDate, 1)

      // Check if the booking overlaps with this date or the next day (for overnight slots)
      return bookingStart <= addDays(nextDay, 1) && bookingEnd >= checkDate
    })

    return allSlots
      .filter((slot) => {
        const slotStart = new Date(date)
        slotStart.setHours(slot.hour, 0, 0, 0)
        
        if (isToday && slotStart <= now) {
          return false
        }

        const slotEnd = addHours(slotStart, 6) // 6-hour minimum duration

        // Check if this FULL 6-hour slot conflicts with any existing booking
        const isSlotAvailable = !relevantBookings.some((booking) => {
          const bookingStart = new Date(booking.startDate)
          const bookingEnd = new Date(booking.endDate)

          // Check for overlap: slot conflicts if it starts before booking ends and ends after booking starts
          return slotStart < bookingEnd && slotEnd > bookingStart
        })
        return isSlotAvailable
      })
      .map((slot) => {
        const checkoutHour = (slot.hour + 6) % 24
        return {
          ...slot,
          isAvailable: true, // It's available because it passed the filter
          checkoutTime: formatTime(checkoutHour, 0),
          checkoutHour: checkoutHour,
        }
      })
  }

  const disabledDates = useMemo(() => {
    const disabledSet = new Set<string>()
    const today = startOfDay(new Date())

    const todayPlus365 = addDays(today, 365)
    for (let i = 0; i < 365; i++) {
      const checkDate = addDays(today, i)
      const availableSlots = getAvailableTimeSlots(checkDate)
      if (availableSlots.length === 0) {
        disabledSet.add(checkDate.toISOString().split('T')[0])
      }
    }
    availabilities.forEach((avail) => {
      if (!avail.isAvailable) {
        const rangeDates = expandDateRange(avail.startDate, avail.endDate)
        rangeDates.forEach((date) => {
          if (date >= today && date <= todayPlus365) {
            // Use consistent key: local date string or timestamp
            const key = date.toDateString() 
            disabledSet.add(key)
          }
        })
      }
    })

    // Convert back to Date[] for Calendar
    return Array.from(disabledSet).map((dateStr) => new Date(dateStr))
  }, [bookings, availabilities]) 

  const getAvailableCheckOutTimes = (): TimeSlot[] => {
    if (!selectedDate || !selectedCheckInTime) return []

    const checkInHour = parseInt(selectedCheckInTime.split(':')[0])
    const checkoutHour = (checkInHour + 6) % 24

    return [
      {
        value: checkoutHour.toString().padStart(2, '0') + ':00',
        label: formatTime(checkoutHour, 0),
        hour: checkoutHour,
      },
    ]
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setSelectedCheckInTime(null)
    setSelectedCheckOutTime(null)
    datePopUp.toggle()
  }

  const handleCheckInTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedCheckInTime(timeSlot.value)
    const checkOutTime = timeSlot.checkoutHour?.toString().padStart(2, '0') + ':00'
    setSelectedCheckOutTime(checkOutTime)

    if (selectedDate && timeSlot.checkoutHour !== undefined) {
      const checkInDate = new Date(selectedDate)
      checkInDate.setHours(timeSlot.hour, 0, 0, 0)

      const checkOutDate = new Date(selectedDate)
      checkOutDate.setHours(timeSlot.checkoutHour, 0, 0, 0)

      if (timeSlot.checkoutHour < timeSlot.hour) {
        checkOutDate.setDate(checkOutDate.getDate() + 1)
      }

      setDates(checkInDate, checkOutDate)
    }

    checkInPopUp.toggle()
  }
  const handleCheckOutTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedCheckOutTime(timeSlot.value)
    checkOutPopUp.toggle()
  }

  const availableTimeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : []
  const availableCheckOutTimes = getAvailableCheckOutTimes()
  const total = (chalet?.perHourCost ?? 0) * 6 + 200 + (chalet?.additionFeeForFullRefund || 0)

  return (
    <div className="bg-[#F9FAFB] rounded-2xl">
      <div className="sm:p-5 p-4 !pb-4">
        <h3 className="font-bold xl:text-[20px] md:text-lg text-[16px] leading-[24px] text-[#19191A] pb-3">
          Choose Your Package
        </h3>
        <h2 className="lg:text-[20px] md:text-[16px] text-sm leading-6 font-normal text-[#19191A] flex items-center">
          {chalet?.perHourCost + ' KWD'}
          <span className="text-[16px]">/ hour</span>
        </h2>
      </div>

      <div className="px-5 py-3">
        <div className="w-full rounded-xl border border-[#D1D5DB] overflow-hidden text-sm text-[#19191A]">
          <div className="p-3 border-[#D1D5DB] border-b-1">
            <CustomPopOver
              isOpen={datePopUp.isOpen}
              onClose={datePopUp.toggle}
              triggerChildren={
                <span className="cursor-pointer">
                  <span className="block text-[10px] font-semibold">SELECT DATE</span>
                  <span className="block text-[14px] text-[#9EA0A2]">
                    {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Choose date'}
                  </span>
                </span>
              }
            >
              <div className="p-4 w-80">
                <SimpleCalendar
                  onDateChange={handleDateChange}
                  initialDate={selectedDate || new Date()}
                  minDate={new Date()}
                  disabledDates={disabledDates}
                  showMonthAndYearPickers={true}
                  showDateDisplay={true}
                />
              </div>
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
                      {selectedCheckInTime
                        ? formatTime(parseInt(selectedCheckInTime.split(':')[0]), 0)
                        : 'Select time'}
                    </span>
                  </span>
                }
              >
                <div className="p-4 max-h-60 overflow-y-auto">
                  {!selectedDate ? (
                    <p className="text-sm text-gray-500">Please select a date first</p>
                  ) : availableTimeSlots.length === 0 ? (
                    <p className="text-sm text-gray-500">No available 6-hour slots for this date</p>
                  ) : (
                    <div className="space-y-2">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => handleCheckInTimeSelect(slot)}
                          className="w-full text-left p-3 rounded hover:bg-gray-100 text-sm border border-gray-200"
                        >
                          <div className="font-medium">{slot.label}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Checkout: {slot.checkoutTime} (6 hours)
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                      {selectedCheckOutTime
                        ? formatTime(parseInt(selectedCheckOutTime.split(':')[0]), 0)
                        : 'Auto-selected'}
                    </span>
                  </span>
                }
              >
                <div className="p-4">
                  {!selectedCheckInTime ? (
                    <p className="text-sm text-gray-500">Please select check-in time first</p>
                  ) : (
                    <div className="space-y-2">
                      {availableCheckOutTimes.map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => handleCheckOutTimeSelect(slot)}
                          className="w-full text-left p-2 rounded hover:bg-gray-100 text-sm"
                        >
                          {slot.label} (6 hours from check-in)
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CustomPopOver>
            </div>
          </div>
          <AddGuests maxGuests={maxGuests || null} />
        </div>
      </div>

      <div className="px-5 pb-5">
        <Button
          className={'w-[100%] mb-5 text-white py-2 rounded-lg font-medium cursor-pointer'}
          onClick={() => {
            setPackageAmount(total)
            setChaletDetails(chalet)
            setBookingType('hourly')
            router.push(`/chalet/${id}/booking`)
          }}
          disabled={!selectedDate || !selectedCheckInTime || !selectedCheckOutTime}
        >
          Book Now
        </Button>
      </div>
      <RefundDepositRules bookingConfig={bookingConfig} lang={lang} />
      {selectedDates?.checkIn && (
        <div className="px-5 pb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-normal text-[#19191A] flex items-center">
              {chalet?.perHourCost} {bookingConfig.currency} × 6 hours
            </span>
            <span className="font-normal text-[16px] text-[#19191A]">
              {(chalet?.perHourCost ?? 0) * 6} {bookingConfig.currency}
            </span>
          </div>
          <PackagePricingSummary bookingConfig={bookingConfig} total={total} additionFeeForFullRefund={chalet?.additionFeeForFullRefund} />
        </div>
      )}
    </div>
  )
}

export default HourlyBookingSummary
