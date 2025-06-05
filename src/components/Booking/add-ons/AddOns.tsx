import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CategorySection } from './CategorySection'
import { AddOnItem } from '@/lib/types/booking'

const ICONS = {
  BBQ: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.84961 10.1487H21.1506" stroke="#19191A" stroke-linecap="round"></path>
    <path d="M4.67969 10.1487V11.0638C4.67969 15.1067 7.95713 18.3842 12.0001 18.3842C16.043 18.3842 19.3205 15.1067 19.3205 11.0638V10.1487" stroke="#19191A" stroke-linecap="round"></path>
    <path d="M8.33986 17.469L6.96729 19.7566" stroke="#19191A" stroke-linecap="round"></path>
    <path d="M15.6602 17.469L17.0328 19.7566" stroke="#19191A" stroke-linecap="round"></path>
    <path d="M11.085 12.8938H12.9151" stroke="#19191A" stroke-linecap="round"></path>
    <path d="M12 5.5735V3.74341" stroke="#19191A" stroke-linecap="round"></path>
    <path d="M8.33984 7.40358V5.57349" stroke="#19191A" stroke-linecap="round"></path>
    <path d="M15.6602 7.40358V5.57349" stroke="#19191A" stroke-linecap="round"></path>
  </svg>`,
  // Add other icons here...
}

export const AddOns: React.FC = () => {
  const { getValues, setValue, watch } = useFormContext()
  const selectedAddons: AddOnItem[] = watch('addons') || []

  const baseAddons: Record<string, AddOnItem[]> = {
    Luxury: [
      { icon: ICONS.BBQ, label: 'BBQ setup with private chef', price: 30 },
      { icon: ICONS.BBQ, label: 'Swimming pool presentation', price: 30 },
      { icon: ICONS.BBQ, label: 'Flower Arrangement', price: 30 },
      { icon: ICONS.BBQ, label: 'Birthday Setup', price: 30, notice: '24h Notice' },
      { icon: ICONS.BBQ, label: 'Anniversary Setup', price: 30, notice: '24h Notice' },
    ],
    Essentials: [
      { icon: ICONS.BBQ, label: 'Towels Calening and some fqw', price: 30 },
      { icon: ICONS.BBQ, label: 'Cleaning Services', price: 30 },
      { icon: ICONS.BBQ, label: 'WiFi', price: 30 },
      { icon: ICONS.BBQ, label: 'Extra Water', price: 30 },
      { icon: ICONS.BBQ, label: 'Others', price: 30 },
    ],
    Kids: [
      { icon: ICONS.BBQ, label: 'Pool Floaties/Toys', price: 30 },
      { icon: ICONS.BBQ, label: 'Personal Swimming Trainer', price: 30 },
      { icon: ICONS.BBQ, label: 'Baby Bed', price: 30 },
    ],
  }

  const handleAdd = (item: AddOnItem) => {
    const current = getValues('addons') || []
    const exists = current.find((i: AddOnItem) => i.label === item.label)

    if (!exists) {
      setValue('addons', [...current, { ...item, quantity: 1 }])
    }
  }

  const handleQuantityChange = (item: AddOnItem, quantity: number) => {
    let updated = [...(getValues('addons') || [])]
    updated = updated
      .map((i) => (i.label === item.label ? (quantity > 0 ? { ...i, quantity } : null) : i))
      .filter(Boolean) as AddOnItem[]

    setValue('addons', updated)
  }

  return (
    <div className="flex flex-col items-start relative">
      {Object.entries(baseAddons).map(([title, items]) => (
        <CategorySection
          key={title}
          title={title}
          defaultOpen={title === 'Luxury'}
          items={items.map((item) => {
            const selected = selectedAddons.find((s) => s.label === item.label)
            return { ...item, quantity: selected?.quantity }
          })}
          onItemAdd={(index) => handleAdd(items[index])}
          onQuantityChange={(index, quantity) => handleQuantityChange(items[index], quantity)}
        />
      ))}
    </div>
  )
}
