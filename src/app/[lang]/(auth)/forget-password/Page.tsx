'use client'
import CommonButton from '@/components/Button/Button'
import { CommonInput } from '@/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ForgetPassword = () => {
  const handleChange = () => {}
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-start h-[100%]">
      <div className="max-w-[360px] flex flex-col gap-[24px] pt-[120px]">
        <Image src={'/images/Logo.svg'} alt="" width={150} height={48} />
        <div className="flex flex-col gap-[12px]">
          <h2 className="!text-primary font-semibold text-[39px]">Forget Password</h2>
          <p className="text-secondary font-400 text-[16px]">
            Enter your phone number to reset your password.
          </p>
        </div>
        <CommonInput
          icon={<img src={'/images/countryFlag.svg'} alt="" className="w-[16px] h-[16px]" />}
          prefix="+965"
          name="phone"
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
          type="number"
          label="Phone"
          onChange={handleChange}
        />
        <CommonButton
          children={'Send OTP'}
          className="w-full h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg"
          onClick={() => router.push('/verify-account?mode=reset-password')}
        />
      </div>
    </div>
  )
}

export default ForgetPassword
