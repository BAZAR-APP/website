"use client"
import React, { useState } from 'react'
import { addDays } from 'date-fns'
import { DateRangePicker } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './calender.css'
const Calender = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ])

  return (
    <div className="py-2">
      <h3 className="font-semibold text-xl leading-8 text-[#19191A] flex items-center">
        Check Availability
      </h3>
      <DateRangePicker
        onChange={(item: { selection: { startDate: Date; endDate: Date; key: string } }) =>
          setState([item.selection])
        }
        showSelectionPreview={false}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        preventSnapRefocus={true}
        calendarFocus="backwards"
      />
    </div>
  )
}

export default Calender
