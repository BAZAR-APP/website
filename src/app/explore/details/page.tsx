'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'
import CustomizeStay from './CustomizeStay'
import UserInfo from './UserInfo'
import Payment from './Payment'
import BookingStepper from './BookingStepper'

const Page = () => {
  const [step, setStep] = useState(1)

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <CustomizeStay onNext={() => setStep(2)} />
      case 2:
        return <UserInfo onNext={() => setStep(3)} />
      case 3:
        return <Payment onNext={() => setStep(4)} />
      default:
        return null
    }
  }

  return (
    <div>
      <BookingStepper currentStep={step} />
      <main>{renderStepContent()}</main>
    </div>
  )
}

export default Page
