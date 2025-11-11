'use client'
import PriceDetailCard from './PriceDetailCard'
import { useBookingStore } from '../../stores/useBookingStore'
import { FC } from 'react'
import { ChaletSubscription } from '../../types/chalets'
import { Locale } from '../../i18n.config';

interface SelectablePlansProps {
  subscriptions: ChaletSubscription[]
  lang: Locale
}

const SelectablePlans: FC<SelectablePlansProps> = ({ subscriptions = [], lang }) => {
  const { setPlan, selectedPlan } = useBookingStore()
  const shouldUseLargeGap = subscriptions.length >= 3

  if (subscriptions.length === 0) {
    return (
      <div className="text-center text-lg text-gray-500 pt-8 pb-14 w-full border-b border-[#E5E7EB]">
       {
        lang === 'en' ? 'No Subscription Plans Available' : 'لا توجد خطط اشتراك متاحة'
       } 
      </div>
    )
  }
  return (
    <div
      className={`flex flex-wrap justify-start mx-auto md:pt-15 pt-10 border-b border-[#E5E7EB] md:pb-12 pb-10 ${
        shouldUseLargeGap ? 'gap-14' : 'gap-6'
      }`}
    >
      {subscriptions.map((plan) => (
        <PriceDetailCard
          key={plan.id}
          subscription={plan}
          isSelected={selectedPlan?.id === plan.id}
          onClick={() => {
            if (plan?.id === selectedPlan?.id) {
              setPlan(null)
            } else {
              setPlan(plan)
            }
          }}
        />
      ))}
    </div>
  )
}
export default SelectablePlans
