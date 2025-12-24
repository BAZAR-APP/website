"use client"
import React, { useState } from 'react'
import { addDays, eachDayOfInterval } from 'date-fns'
import { DateRangePicker, RangeKeyDict, Range } from 'react-date-range'
import { Booking } from '../../../types/chalets'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './calender.css'
import { Locale } from '../../../i18n.config'

interface props {
  lang: Locale
  bookings?: Booking[]
}

const Calender: React.FC<props> = ({ lang, bookings = [] }) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ])

  // Process bookings to get disabled dates
  const disabledDates = React.useMemo(() => {
    let dates: Date[] = []

    bookings.forEach((booking) => {
      // Ensure we have valid dates
      if (!booking.startDate || !booking.endDate) return

      const start = new Date(booking.startDate)
      const end = new Date(booking.endDate)

      // Generate all days in the range
      const daysInRange = eachDayOfInterval({
        start,
        end,
      })

      dates = [...dates, ...daysInRange]
    })

    return dates
  }, [bookings])

  const handleChange = (rangesByKey: RangeKeyDict) => {
    console.log(rangesByKey);

    setState([rangesByKey.selection])
  }

  return (
    <div className="py-2">
      <h3 className="font-semibold text-xl sm:text-[22px] md:text-[25px] leading-8 text-[#19191A] flex items-center">
        {
          lang === 'en' ? 'Check Availability' : 'التحقق من التوفر'
        }
      </h3>
      <DateRangePicker
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        preventSnapRefocus={true}
        calendarFocus="backwards"
        disabledDates={disabledDates}
        minDate={new Date()}
      />
    </div>
  )
}

export default Calender