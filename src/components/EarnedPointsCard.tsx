import React from 'react'
import Image from 'next/image'
import { AnimatedPointsProgress } from './AnimatedPointsProgress '
import { getTierInfo } from '@/lib/utils'

interface EarnedPointsCardProps {
  currentPoints: number
  maxPoints: number
  page: any
  tier: string
  lang: 'en' | 'ar'
}

export const EarnedPointsCard: React.FC<EarnedPointsCardProps> = ({
  currentPoints,
  maxPoints,
  tier = '',
  lang,
}) => {


  const { name, range, title, message, icon } = getTierInfo(tier, lang)

  return (
    <section className="flex flex-col items-start p-4 gap-2 w-full lg:max-w-[351px] max-w-full bg-[#F9FAFB] rounded-[16px]">
      {name && range && (
        <div className="flex items-center gap-[16px]">
          <Image src={'/images/platinumTier.svg'} width={64} height={64} alt="Tier img" />

          <h3 className="font-semibold sm:text-[20px] text-[16px] sm:leading-[32px] leading-5 flex flex-wrap gap-1.5 items-center text-[#19191A]">
            <span>{name}</span>
            {range}
          </h3>
        </div>
      )}

      <div className="flex flex-col items-center gap-[16px]">
        <AnimatedPointsProgress earnedPoints={currentPoints} maxPoints={maxPoints} />

        <div className="text-center">
          <div className="flex items-center gap-[4px] mb-[8px]">
            {icon && <Image src={icon} width={22} height={22} alt="Tier img" />}
            {title && (
              <span className="font-medium text-[14px] leading-[17px] text-[#29397E]">{title}</span>
            )}
          </div>
          {message && (
            <p className="text-[12px] leading-[15px] text-left text-[#29397E]">{message}</p>
          )}
        </div>
      </div>
    </section>
  )
}
