'use client'

import { useState } from 'react'
import CommonButton from '@/components/Button/Button'
import OneTimePassword from '@/components/OTPInput'
import Image from 'next/image'

const VerifyAccount = () => {
  const [otp, setOtp] = useState('')

  const handleOtpChange = (value: string) => {
    setOtp(value)
  }

  const isOtpFilled = otp.trim().length > 5

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]">
        <Image src={'/images/Logo.svg'} alt="logo" width={150} height={48} />

        <div className="flex flex-col gap-[12px]">
          <h2 className="!text-primary font-600 text-[39px]">
            Verify Your
            <br /> Account
          </h2>
          <p className="!text-secondary font-600 text-[16px]">
            Enter the 5-digit code sent to your phone to complete verification.
          </p>
        </div>

        <OneTimePassword className="flex gap-[8px]" onChange={handleOtpChange} />

        <div className="flex justify-between">
          <div className="text-[#484A4C] font-normal">
            Didn’t Receive a Code? <span className="text-[#29397E] font-bold">Resend</span>
          </div>

          <div className="text-[#29397E] font-bold">01:50</div>
        </div>

        <CommonButton intent={isOtpFilled ? 'primary' : 'secondary'} disabled={!isOtpFilled}>
          Verify
        </CommonButton>

        <div className="flex items-center space-x-1 text-[14px]">
          <span className="text-[#484A4C]">Already have an account?</span>
          <a href="/login" className="text-[#29397E] font-bold">
            Log in
          </a>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount
