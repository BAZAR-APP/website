'use client'
import PriceDetailCard from './PriceDetailCard'
import { useBookingStore } from '../../stores/useBookingStore'
import { FC } from 'react'
import { ChaletSubscription } from '../../types/chalets'

const SelectablePlans: FC<{ subscriptions: ChaletSubscription[] }> = ({ subscriptions = [] }) => {
  const { setPlan, selectedPlan } = useBookingStore()
  const shouldUseLargeGap = subscriptions.length > 3

  return (
    <div
      className={`flex 2xl:flex-nowrap flex-wrap justify-start mx-auto md:pt-15 pt-10 border-b border-[#E5E7EB] md:pb-12 pb-10 ${
        shouldUseLargeGap ? 'gap-14' : 'gap-6'
      }`}
    >
      {subscriptions.map((plan) => (
        <PriceDetailCard
          key={plan.id}
          title={plan.title}
          subtitle={plan?.type}
          price={plan.price + ' ' + plan?.priceUnit}
          description={''}
          isSelected={selectedPlan?.id === plan.id}
          onClick={() => {
            if (plan?.id === selectedPlan?.id) {
              setPlan(null)
            } else {
              setPlan(plan)
            }
          }}
          isPopular={true}
        />
      ))}
    </div>
  )
}
export default SelectablePlans
