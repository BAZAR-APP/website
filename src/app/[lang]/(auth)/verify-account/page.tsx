'use client'

import { useEffect, useState } from 'react'
import CommonButton from '@/components/Button/Button'
import OneTimePassword from '@/components/OTPInput'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/lib/utils'

const RESEND_INTERVAL = 60 // seconds

const VerifyAccount = () => {
  const searchParams = useSearchParams()
  const mode = searchParams?.get('mode')
  const userId = searchParams?.get('userId')
  const phone = searchParams?.get('phone')

  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(RESEND_INTERVAL)
  const router = useRouter()

  const isOtpFilled = otp.trim().length > 5

  // Timer logic
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  // Format time MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // VERIFY OTP mutation
  const verifyMutation = useMutation({
    mutationFn: async () =>
      api.post('/auth/verifyOtp', {
        userId,
        otpCode: +otp,
      }),
    onSuccess: (res) => {
      router.replace(
        mode === 'reset-password'
          ? `/reset-password?token=${res?.data?.accessToken}`
          : '/verify-account/success',
      )
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error))
    },
  })

  // RESEND OTP mutation
  const resendMutation = useMutation({
    mutationFn: async () =>
      api.post('/auth/forgetPassword', {
        phoneNumber: phone,
        callingCode: '+965',
      }),
    onSuccess: () => {
      toast.success('OTP resent successfully')
      setTimer(RESEND_INTERVAL) // Restart timer
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error))
    },
  })

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]">
        <Image src="/images/Logo.svg" alt="logo" width={150} height={48} />

        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary font-semibold text-[24px] sm:text-[32px] leading-tight">
            Verify Your
            <br /> Account
          </h2>
          <p className="!text-secondary font-600 text-[16px]">
            Enter the 5-digit code sent to your phone to complete verification.
          </p>
        </div>

        <OneTimePassword className="flex gap-[8px]" onChange={setOtp} />

        <div className="flex justify-between items-center">
          <div className="text-[#484A4C] font-normal">
            Didn’t Receive a Code?{' '}
            <button
              disabled={timer > 0 || resendMutation.isPending}
              onClick={() => resendMutation.mutate()}
              className={`font-bold cursor-pointer ${timer > 0 ? 'text-gray-400' : 'text-[#29397E]'}`}
            >
              Resend
            </button>
          </div>
          <div className="text-[#29397E] font-bold">{formatTime(timer)}</div>
        </div>

        <CommonButton
          intent={isOtpFilled ? 'primary' : 'secondary'}
          disabled={!isOtpFilled || verifyMutation.isPending}
          onClick={() => verifyMutation.mutate()}
        >
          {verifyMutation.isPending ? 'Verifying...' : 'Verify'}
        </CommonButton>
      </div>
    </div>
  )
}

export default VerifyAccount
