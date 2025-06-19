import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CategorySection } from './CategorySection'
import { Customization, GroupedCustomization } from '@/lib/types/booking'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/lib/axios'

export const AddOns: React.FC = () => {
  const { getValues, setValue, watch } = useFormContext()
  const selectedAddons: Customization[] = watch('addons') || []

  const { data, isLoading } = useQuery({
    queryKey: ['customizations'],
    queryFn: () => fetcher('/customizations'),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  if (isLoading) return

  const groupedCustomization: GroupedCustomization[] = Object.values(
    (data as Customization[]).reduce<Record<string, GroupedCustomization>>((acc, item) => {
      const id = item.customizationCategoryId

      if (!acc[id]) {
        acc[id] = {
          customizationCategoryId: id,
          customizationCategory: item.customizationCategory,
          customizations: [],
        }
      }

      acc[id].customizations.push(item)
      return acc
    }, {}),
  )
  
  const handleAdd = (item: Customization) => {
    const current = getValues('addons') || []
    const exists = current.find((i: Customization) => i.id === item.id)

    if (!exists) {
      setValue('addons', [...current, { ...item, selectedQuantity: 1 }])
    }
  }

  const handleQuantityChange = (item: Customization, quantity: number) => {
    let updated = [...(getValues('addons') || [])]
    updated = updated
      .map((i) =>
        i.id === item.id ? (quantity > 0 ? { ...i, selectedQuantity: quantity } : null) : i,
      )
      .filter(Boolean) as Customization[]

    setValue('addons', updated)
  }

  return (
    <div className="flex flex-col items-start relative">
      {groupedCustomization.map((customization: GroupedCustomization, index) => (
        <CategorySection
          key={customization?.customizationCategoryId}
          title={customization?.customizationCategory?.title}
          defaultOpen={index === 0}
          items={customization?.customizations.map((item: Customization) => {
            const selected = selectedAddons.find((s) => s.id === item.id)
            return { ...item, selectedQuantity: selected?.selectedQuantity }
          })}
          onItemAdd={(index) => handleAdd(customization?.customizations?.[index])}
          onQuantityChange={(index, quantity) =>
            handleQuantityChange(customization?.customizations?.[index], quantity)
          }
        />
      ))}
    </div>
  )
}
