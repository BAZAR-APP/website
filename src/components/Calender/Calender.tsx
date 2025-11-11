"use client"
import React, { useState } from 'react'
import { addDays } from 'date-fns'
import { DateRangePicker, RangeKeyDict, Range } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './calender.css'
import { Locale } from '../../../i18n.config'

interface props{
lang : Locale
}

const Calender: React.FC<props> = ({lang}) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ])

  const handleChange = (rangesByKey: RangeKeyDict) => {
    console.log(rangesByKey);
    
    setState([rangesByKey.selection])
  }

  return (
    <div className="py-2">
      <h3 className="font-semibold text-xl sm:text-[22px] md:text-[25px] leading-8 text-[#19191A] flex items-center">
        {
          lang==='en' ? 'Check Availability' : 'التحقق من التوفر'
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
      />
    </div>
  )
}

export default Calender