import React, { FC } from 'react'
import { useBookingStore } from '../../../../../../../../stores/useBookingStore'

const AddGuests: FC<{ maxGuests: string | null }> = ({ maxGuests }) => {
  const { setGuests, guests } = useBookingStore()
  const handleQuantityChange = (newQuantity: number) => {
    if (maxGuests && newQuantity > 0 && newQuantity <= +maxGuests) {
      setGuests(newQuantity)
    }
  }

  return (
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
  )
}

export default AddGuests
