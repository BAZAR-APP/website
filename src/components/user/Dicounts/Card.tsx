import { getDictionary } from '@/lib/dictionary'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { FC } from 'react'
import { Locale } from '../../../../i18n.config'
const renderIcons = {
  discount: '/images/discount-shape.svg',
  free: '/images/free-icon.svg',
}
const DiscountCard: FC<{
  title: string
  points: number
  value: keyof typeof renderIcons
  onRedeemClick: () => void
}> = ({ title, value, points, onRedeemClick }) => {
  const params = useParams()
  const lang = params?.lang as Locale
  const { page } = getDictionary(lang)

  return (
    <div className="bg-[#F9FAFB] p-4 rounded-xl flex flex-col items-center">
      <div className="mb-3">
        <Image
          src={renderIcons[value]}
          alt={title}
          width={160}
          height={160}
          className="w-[122px] h-[122px]"
        />
      </div>
      <p className="self-start text-[20px] leading-6 text-[#19191A]">{title}</p>
      <p className="self-start text-sm leading-[17px] text-[#29397E] opacity-70 mt-2">
        {points} points
      </p>
      <button
        className="mt-2 cursor-pointer self-start text-sm text-[#29397E] font-medium underline"
        onClick={onRedeemClick}
      >
        {page.common.redeem_now} &rsaquo;
      </button>
    </div>
  )
}

export default DiscountCard
