'use client'
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Popover } from '@radix-ui/themes'
import { fields } from '@/lib/constant'
import { Button } from '@/components'
import SimpleCalender from './Calender/SimpleCalender'
import Checkbox from './CheckBox/CheckBox'
import { useChaletFiltersStore } from '../../stores/useChaletFiltersStore'
import { usePathname, useRouter } from 'next/navigation'

const locations = [
  'Al Khobar',
  'Brasiler',
  'Al Jubail',
  'Zour',
  'Fahaheel',
  'Abu Al Hasaniya',
  'Al Mangaf',
]

const CalendarMock = ({ onDateChange }: { onDateChange: (date: Date) => void }) => (
  <SimpleCalender initialDate={new Date()} minDate={new Date()} onDateChange={onDateChange} />
)

const SearchHeader = () => {
  const path = usePathname()
  const router = useRouter()
  const { city: storeCity, setFilters } = useChaletFiltersStore()

  const [localCity, setLocalCity] = useState<string[]>(storeCity)
  const [guests, setGuests] = useState(0)
  const [checkin, setCheckin] = useState<Date | null>(null)
  const [checkout, setCheckout] = useState<Date | null>(null)

  // Popover open states
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleCity = (location: string, checked: boolean) => {
    const updated = checked
      ? [...localCity, location]
      : localCity.filter((c) => c !== location)
    setLocalCity(updated)
    if (!checked || updated.length > 0) {
      setOpenIndex(null)
    }
  }

  const handleDateSelect = (type: 'checkin' | 'checkout', date: Date) => {
    if (type === 'checkin') setCheckin(date)
    else setCheckout(date)
    setOpenIndex(null)
  }

  const handleSearchClick = () => {
    setFilters({
      city: localCity,
      guests,
      checkin: checkin?.toISOString() || '',
      checkout: checkout?.toISOString() || '',
    })
    if (['/en/', '/ar/']?.includes(path)) {
      router.push('/explore')
    }
  }

  const getDisplayValue = (field: any) => {
    switch (field.label) {
      case 'Location':
        return localCity.length ? localCity.join(', ') : field.placeholder
      case 'Check in':
        return checkin ? checkin.toDateString() : field.placeholder
      case 'Check out':
        return checkout ? checkout.toDateString() : field.placeholder
      case 'Guests':
        return guests > 0 ? `${guests} Guest${guests > 1 ? 's' : ''}` : field.placeholder
      default:
        return field.placeholder
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center p-2.5 gap-7 bg-[#F9FAFB] md:rounded-full rounded-xl w-auto md:w-full mx-2">
      <div className="grid grid-cols-2 gap-3 w-full md:flex md:flex-row md:gap-0 md:divide-x divide-[#E5E7EB] justify-between">
        {fields.map((field, index) => (
          <Popover.Root key={index} open={openIndex === index} onOpenChange={(open) => setOpenIndex(open ? index : null)}>
            <Popover.Trigger>
              <button
                onClick={() => setOpenIndex(index)}
                className={`flex flex-col text-left px-0 md:px-4 w-full md:w-auto cursor-pointer ${index === 0 ? 'lg:w-[30%]' : 'lg:w-[20%]'}`}
              >
                <span className="text-[12px] font-bold text-primary">{field.label}</span>
                <span className="text-sm text-secondary">{getDisplayValue(field)}</span>
              </button>
            </Popover.Trigger>
            <Popover.Content
              align="start"
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50"
            >
              {field.label === 'Location' ? (
                <div className="flex flex-col gap-1.5">
                  {locations.map((location) => (
                    <Checkbox
                      key={location}
                      label={location}
                      className="text-sm text-gray-700 !cursor-pointer"
                      checked={localCity.includes(location)}
                      onChange={(checked) => toggleCity(location, checked)}
                    />
                  ))}
                </div>
              ) : field.label === 'Check in' ? (
                <CalendarMock onDateChange={(date) => handleDateSelect('checkin', date)} />
              ) : field.label === 'Check out' ? (
                <CalendarMock onDateChange={(date) => handleDateSelect('checkout', date)} />
              ) : (
                <div className="flex items-center gap-2 relative">
                  <div>
                    <div className="font-medium">Guests</div>
                    <div className="text-sm text-gray-500">Adults and children</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests((prev) => Math.max(prev - 1, 1))}
                      className="flex w-8 h-8 justify-center items-center p-[6.4px] rounded-full border border-[#E5E5EA]"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M14.7997 10H5.19971" stroke="#19191A" strokeWidth="1.6" />
                      </svg>
                    </button>
                    <span className="text-[#19191A] text-base font-medium">{guests}</span>
                    <button
                      onClick={() => setGuests((prev) => prev + 1)}
                      className="flex w-8 h-8 justify-center items-center p-[6.4px] rounded-full border border-[#E5E5EA]"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10.0002 5.19995V14.8M5.2002 10H14.8002"
                          stroke="#19191A"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </Popover.Content>
          </Popover.Root>
        ))}
      </div>

      <Button
        onClick={handleSearchClick}
        className="w-full md:min-w-[48px] md:min-h-[48px] sm:w-14 sm:h-14 cursor-pointer bg-[#29397E] !rounded-full flex items-center justify-center hover:bg-blue-900 transition"
      >
        <Search className="text-white min-w-[20px] min-h-[20px]" />
      </Button>
    </div>
  )
}

export default SearchHeader
