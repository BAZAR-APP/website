'use client'
import PriceDetailCard from './PriceDetailCard'
import { useBookingStore } from '../../stores/useBookingStore'
import { FC } from 'react'
import { ChaletSubscription } from '../../types/chalets'

const SelectablePlans: FC<{ subscriptions: ChaletSubscription[] }> = ({ subscriptions = [] }) => {
  const { setPlan, selectedPlan } = useBookingStore()

  return (
    <div className="flex flex-wrap justify-between xl:gap-0 gap-18 mx-auto md:pt-15 pt-10 border-b border-[#E5E7EB] md:pb-12 pb-10">
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
