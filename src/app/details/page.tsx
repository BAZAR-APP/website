'use client'

import React, { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'
import CustomizeStay from './CustomizeStay'
import UserInfo from './UserInfo'
import Payment from './Payment'

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
      <Header />
      <div className="w-full flex justify-center py-4 bg-gray-50">
        <ol className="flex space-x-4 text-sm font-medium text-gray-500">
          <li className={step === 1 ? 'text-blue-600 font-semibold' : ''}>1. Step One</li>
          <li className={step === 2 ? 'text-blue-600 font-semibold' : ''}>2. Step Two</li>
          <li className={step === 3 ? 'text-blue-600 font-semibold' : ''}>3.  Step Three</li>
        </ol>
      </div>

      <main>{renderStepContent()}</main>

      <Footer />
    </div>
  )
}

export default Page
