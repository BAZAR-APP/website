import Image from 'next/image'
import React from 'react'

interface AddOnCardProps {
  icon: string
  label: string
  price: number
  is24HourNotice?: boolean
  quantity?: string
  onAdd?: () => void
  onQuantityChange?: (quantity: number) => void
}

export const AddOnCard: React.FC<AddOnCardProps> = ({
  icon,
  label,
  price,
  is24HourNotice,
  quantity,
  onAdd,
  onQuantityChange,
}) => {
  return (
    <div className="flex flex-col items-start gap-3 self-stretch relative bg-gray-50 px-6 py-4 rounded-2xl">
      <div className="flex items-center gap-3 relative px-0 py-1">
        {icon && <Image src={icon} width={16} height={16} alt="icon" />}
        <div className="text-[#19191A] text-base font-normal relative">{label}</div>
        {is24HourNotice && (
          <div className="text-[#29397E] text-center text-sm font-normal relative gap-0.5 bg-[#E1F3FF] px-1.5 py-1 rounded-md">
            24h Notice
          </div>
        )}
      </div>
      <div className="w-full border relative bg-[#DEDEDF]" />
      <div className="flex items-center gap-4 self-stretch relative">
        <div className="flex-1 text-[#484A4C] text-xs font-normal relative">
          <span className="font-normal text-base text-[#19191A]">{price} KWD</span>
          <span className="font-normal text-xs text-[#484A4C]"> / night</span>
        </div>
        <div className="flex items-start relative">
          {quantity !== undefined ? (
            <div className="flex items-center gap-2 relative h-10 w-22">
              <button
                onClick={() => onQuantityChange?.(+quantity - 1)}
                className="flex cursor-pointer w-8 h-8 justify-center items-center relative p-[6.4px] rounded-[80px] border-[0.8px] border-solid border-[#E5E5EA]"
                aria-label="Decrease quantity"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7997 10H5.19971"
                    stroke="#19191A"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-[#19191A] text-base font-medium leading-6">{quantity}</span>
              <button
                onClick={() => onQuantityChange?.(+quantity + 1)}
                className="flex cursor-pointer w-8 h-8 justify-center items-center relative p-[6.4px] rounded-[80px] border-[0.8px] border-solid border-[#E5E5EA]"
                aria-label="Increase quantity"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
          ) : (
            <button
              onClick={onAdd}
              className="flex cursor-pointer w-20 justify-center h-10 items-center gap-2 border border-solid relative px-3 py-2 rounded-lg"
            >
              <span className="text-[#1F2A37] text-xs font-medium leading-[18px]">Add</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.3335 8.66659H3.3335V7.33325H7.3335V3.33325H8.66683V7.33325H12.6668V8.66659H8.66683V12.6666H7.3335V8.66659Z"
                  fill="#1D1B20"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
