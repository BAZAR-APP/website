import React from 'react'
import { Calendar } from 'react-date-range'

interface SimpleCalendarProps {
  onDateChange?: (date: Date) => void
  initialDate?: Date
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  showMonthAndYearPickers?: boolean
  showDateDisplay?: boolean
  [key: string]: any // For additional props
}

const SimpleCalendar: React.FC<SimpleCalendarProps> = ({ 
  onDateChange, 
  initialDate = new Date(),
  minDate,
  maxDate,
  disabledDates,
  showMonthAndYearPickers = true,
  showDateDisplay = true,
  ...otherProps 
}) => {
  const handleDateChange = (date: Date) => {
    if (onDateChange) {
      onDateChange(date)
    }
  }

  return (
    <Calendar 
      date={initialDate}
      onChange={handleDateChange}
      minDate={minDate}
      maxDate={maxDate}
      disabledDates={disabledDates}
      showMonthAndYearPickers={showMonthAndYearPickers}
      showDateDisplay={showDateDisplay}
      {...otherProps}
    />
  )
}

export default SimpleCalendar