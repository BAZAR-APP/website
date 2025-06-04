'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import PriceDetailCard from './PriceDetailCard'
import { Badge } from './BadgePill'

const plans = [
  {
    id: 'members',
    title: '6 Hours',
    subtitle: 'Weekdays',
    price: '60 KWD',
    description: '6-hour minimum',
    isPopular: false,
    badge: {
      type: 'members' as const,
      text: 'Members Only',
      icon: <Star className="w-3 h-3" />,
    } satisfies Badge,
  },
  {
    id: 'exclusive',
    title: '3 Days',
    subtitle: 'Weekend',
    price: '400 KWD',
    description: 'Split payment available',
    isPopular: true,
    badge: {
      type: 'exclusive' as const,
      text: 'Exclusive',
    } satisfies Badge,
  },
  {
    id: 'promo',
    title: '4 Days',
    subtitle: 'Weekdays',
    price: '400 KWD',
    description: '',
    isPopular: false,
    badge: {
      type: 'promo' as const,
      text: 'Promo',
    } satisfies Badge,
  },
]

export default function SelectablePlans() {
  const [selected, setSelected] = useState('members')

  return (
    <div className="flex flex-wrap justify-between xl:gap-4 gap-18 mx-auto md:pt-15 pt-10 border-b border-[#E5E7EB] md:pb-12 pb-10">
      {plans.map((plan) => (
        <PriceDetailCard
          key={plan.id}
          title={plan.title}
          subtitle={plan.subtitle}
          price={plan.price}
          description={plan.description}
          isSelected={selected === plan.id}
          onClick={() => setSelected(plan.id)}
          isPopular={plan.isPopular}
          badge={plan.badge.type !== 'promo' ? plan.badge : undefined}
        />
      ))}
    </div>
  )
}
