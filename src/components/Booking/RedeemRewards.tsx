'use client'

import { Button, CommonInput } from '@/components'
import ModalDialog from '@/components/ModalDialog/Dialog'
import { useQueryBase } from '@/lib/axios'
import useToggle from '@/lib/hooks/useToggle'
import { copyToClipboard } from '@/lib/utils'
import { Text } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { Locale } from '../../../i18n.config'
import AvailableDiscounts  from '../user/Dicounts/AvailableDiscounts'
import DiscountCard from '../user/Dicounts/Card'

const discounts = [
  { label: '10% Discount', points: 600, icon: '/images/discount-shape.svg' },
  { label: '20% Discount', points: 800, icon: '/images/discount-shape.svg' },
  { label: '30% Discount', points: 1000, icon: '/images/discount-shape.svg' },
  { label: '50% Discount', points: 1500, icon: '/images/discount-shape.svg' },
  { label: 'Free Night', points: 1000, icon: '/images/free-icon.svg' },
]

const RedeemRewards = () => {
  const { isOpen, toggle } = useToggle(false)
  const [step, setStep] = useState<'select' | 'confirm' | 'copy'>('select')
  const [selectedDiscount, setSelectedDiscount] = useState<(typeof discounts)[0] | null>(null)

  const handleDiscountClick = (discount: (typeof discounts)[0]) => {
    setSelectedDiscount(discount)
    setStep('confirm')
  }

  const handleRedeemNow = () => {
    setStep('copy')
  }

  const handleClose = () => {
    toggle()
  }

  return (
    <div>
      <Button asChild onClick={toggle} intent="transperent" className="!px-0">
        <span className="text-sm !text-[#29397E] font-medium cursor-pointer flex items-center gap-2 underline underline-offset-2">
          Redeem Gifts & Discounts <ChevronRight className="w-3 h-3" strokeWidth={3} />
        </span>
      </Button>

      {isOpen && <AvailableDiscounts showUserDisocunts={true} onClose={handleClose} />}
    </div>
  )
}

export default RedeemRewards
