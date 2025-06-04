import React, { useState } from 'react'
import { CategorySection } from './CategorySection'

// Icons and data would typically come from a separate file or API
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

type AddOnItem = {
  icon: string
  label: string
  price: number
  quantity?: number
  notice?: string
}

export const AddOns: React.FC = () => {
  const [luxuryItems, setLuxuryItems] = useState<AddOnItem[]>([
    { icon: ICONS.BBQ, label: 'BBQ setup with private chef', price: 30, quantity: 1 },
    { icon: ICONS.BBQ, label: 'Swimming pool presentation', price: 30 },
    { icon: ICONS.BBQ, label: 'Flower Arrangement', price: 30 },
    { icon: ICONS.BBQ, label: 'Birthday Setup', price: 30, notice: '24h Notice' },
    { icon: ICONS.BBQ, label: 'Anniversary Setup', price: 30, notice: '24h Notice' },
  ])

  const [essentialItems, setEssentialItems] = useState<AddOnItem[]>([
    { icon: ICONS.BBQ, label: 'Towels', price: 30 },
    { icon: ICONS.BBQ, label: 'Cleaning Services', price: 30 },
    { icon: ICONS.BBQ, label: 'WiFi', price: 30 },
    { icon: ICONS.BBQ, label: 'Extra Water', price: 30 },
    { icon: ICONS.BBQ, label: 'Others', price: 30 },
  ])

  const [kidsItems, setKidsItems] = useState<AddOnItem[]>([
    { icon: ICONS.BBQ, label: 'Pool Floaties/Toys', price: 30 },
    { icon: ICONS.BBQ, label: 'Personal Swimming Trainer', price: 30 },
    { icon: ICONS.BBQ, label: 'Baby Bed', price: 30 },
  ])

  const handleLuxuryAdd = (index: number) => {
    const newItems = [...luxuryItems]
    newItems[index] = { ...newItems[index], quantity: 1 }
    setLuxuryItems(newItems)
  }

  const handleLuxuryQuantityChange = (index: number, quantity: number) => {
    if (quantity < 0) return
    const newItems = [...luxuryItems]
    if (quantity === 0) {
      const { quantity: _, ...itemWithoutQuantity } = newItems[index]
      newItems[index] = itemWithoutQuantity
    } else {
      newItems[index] = { ...newItems[index], quantity }
    }
    setLuxuryItems(newItems)
  }

  const handleEssentialAdd = (index: number) => {
    const newItems = [...essentialItems]
    newItems[index] = { ...newItems[index], quantity: 1 }
    setEssentialItems(newItems)
  }

  const handleEssentialQuantityChange = (index: number, quantity: number) => {
    if (quantity < 0) return
    const newItems = [...essentialItems]
    if (quantity === 0) {
      const { quantity: _, ...itemWithoutQuantity } = newItems[index]
      newItems[index] = itemWithoutQuantity
    } else {
      newItems[index] = { ...newItems[index], quantity }
    }
    setEssentialItems(newItems)
  }

  const handleKidsAdd = (index: number) => {
    const newItems = [...kidsItems]
    newItems[index] = { ...newItems[index], quantity: 1 }
    setKidsItems(newItems)
  }

  const handleKidsQuantityChange = (index: number, quantity: number) => {
    if (quantity < 0) return
    const newItems = [...kidsItems]
    if (quantity === 0) {
      const { quantity: _, ...itemWithoutQuantity } = newItems[index]
      newItems[index] = itemWithoutQuantity
    } else {
      newItems[index] = { ...newItems[index], quantity }
    }
    setKidsItems(newItems)
  }

  return (
    <div className="flex flex-col items-start relative">
      <CategorySection
        title="Luxury"
        items={luxuryItems}
        onItemAdd={handleLuxuryAdd}
        onQuantityChange={handleLuxuryQuantityChange}
      />
      <CategorySection
        title="Essentials"
        items={essentialItems}
        onItemAdd={handleEssentialAdd}
        onQuantityChange={handleEssentialQuantityChange}
      />
      <CategorySection
        title="Kids"
        items={kidsItems}
        onItemAdd={handleKidsAdd}
        onQuantityChange={handleKidsQuantityChange}
      />
    </div>
  )
}
