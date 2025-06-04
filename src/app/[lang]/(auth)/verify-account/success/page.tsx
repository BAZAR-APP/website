'use client'

import CommonButton from '@/components/Button/Button'
import { useRouter, useSearchParams } from 'next/navigation'

const AccountVerificationSuccess = () => {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100%]">
        <div className="max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]">
          <img src={'/images/Logo.svg'} alt="" className="w-[150px] h-[48px] mb-[80px]" />
          <div className="flex flex-col gap-[12px]">
            <img src={'/images/Verified.svg'} alt="" className="w-[120px] h-[120px]" />

            <h2 className="!text-primary font-semibold text-[39px]">
              {mode === 'reset-password' && 'Password'} Verified Successfully
            </h2>
            <p className="!text-secondary font-600 text-[16px]">
              {mode === 'reset-password'
                ? 'Your new password is set. You can now log in to your account.'
                : 'Your phone number has been verified. You’re all set to continue!'}
            </p>
          </div>
          <CommonButton
            children={mode === 'reset-password' ? 'Go to Login' : 'Continue'}
            className="w-[360px] h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg"
            onClick={() => router.push('/login')}
          />
        </div>
      </div>
    </>
  )
}

export default AccountVerificationSuccess
