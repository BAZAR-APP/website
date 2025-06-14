import React from 'react'
import Image from 'next/image'
import { AnimatedPointsProgress } from './AnimatedPointsProgress '

interface EarnedPointsCardProps {
  currentPoints: number
  maxPoints: number
  page: any
}

export const EarnedPointsCard: React.FC<EarnedPointsCardProps> = ({
  page,
}) => {


  return (
    <section className="flex flex-col items-start p-4 gap-2 w-full lg:max-w-[351px] max-w-full bg-[#F9FAFB] rounded-[16px]">
      <div className="flex items-center gap-[16px]">
        <Image src={'/images/platinumTier.svg'} width={64} height={64} alt="Tier img" />

        <h3 className="font-semibold sm:text-[20px] text-[16px] sm:leading-[32px] leading-5 flex flex-wrap gap-1.5 items-center text-[#19191A]">
          <span>{page.loyaltyPoints.tier.name}</span>
          {page.loyaltyPoints.tier.range}
        </h3>
      </div>

      <div className="flex flex-col items-center gap-[16px]">
        <AnimatedPointsProgress />

        <div className="text-center">
          <div className="flex items-center gap-[4px] mb-[8px]">
            <Image src={'/images/goldTier.svg'} width={22} height={22} alt="Tier img" />
            <span className="font-medium text-[14px] leading-[17px] text-[#29397E]">
              {page.loyaltyPoints.tier.goldReward}
            </span>
          </div>
          <p className="text-[12px] leading-[15px] text-left text-[#29397E]">
            {page.loyaltyPoints.tier.nextTierMessage}
          </p>
        </div>
      </div>
    </section>
  )
}
