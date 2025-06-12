import React from 'react'
import { Locale } from '../../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'

const LoyaltyPoints = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params
  const { page } = await getDictionary(lang)

  return <div>{page.loyaltyPoints.title}</div>
}

export default LoyaltyPoints
