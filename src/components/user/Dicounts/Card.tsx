import { getDictionary } from '@/lib/dictionary'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { FC } from 'react'
import { Locale } from '../../../../i18n.config'
import { LockIcon } from 'lucide-react'
import clsx from 'clsx'

export const renderIcons = {
  discount: '/images/discount-shape.svg',
  free: '/images/free-icon.svg',
}

const DiscountCard: FC<{
  title: string
  points: number
  value: keyof typeof renderIcons
  onRedeemClick: () => void
  disabled?: boolean
}> = ({ title, value, points, onRedeemClick, disabled = false }) => {
  const params = useParams()
  const lang = params?.lang as Locale
  const { page } = getDictionary(lang)

  return (
    <div className={`relative bg-[#F9FAFB] p-4 rounded-xl flex flex-col items-center`}>
      <div
        className={clsx(
          'mb-3 relative h-full',
          disabled &&
            'rounded-[20px] flex justify-center bg-black/50 backdrop-blur-sm z-[2] h-full w-full pointer-events-none',
        )}
      >
        <Image
          src={renderIcons[value]}
          alt={title}
          width={160}
          height={160}
          className="w-[122px] h-[122px]"
        />
        {disabled && (
          <div className="absolute inset-0 bg-[#00000] flex items-center justify-center rounded-xl">
            <LockIcon />
          </div>
        )}
      </div>

      <p className="self-start text-[20px] leading-6 text-[#19191A]">{title}</p>
      <p className="self-start text-sm leading-[17px] text-[#29397E] opacity-70 mt-2">
        {points} points
      </p>
      <button
        className={`mt-2 cursor-pointer self-start text-sm text-[#29397E] font-medium underline ${
          disabled ? 'opacity-50 pointer-events-none' : ''
        }`}
        onClick={!disabled ? onRedeemClick : undefined}
        disabled={disabled}
      >
        {page.common.redeem_now} &rsaquo;
      </button>
    </div>
  )
}

export default DiscountCard
