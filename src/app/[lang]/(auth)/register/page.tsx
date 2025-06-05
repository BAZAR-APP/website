'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommonInput, CheckBox } from '@/components'
import CommonButton from '@/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { loginSchema } from '@/lib/validationSchemas'
import { useRouter } from 'next/navigation'
interface LoginFormInputs {
  phone: string
  password: string
  rememberMe?: boolean
}
interface PhoneChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

const SignUp = () => {
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    try {
      router.push('/verify-account')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handlePhoneChange = (e: PhoneChangeEvent): void => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8)
    setValue('phone', value, { shouldValidate: true })
  }

  const handlePasswordChange = (e: { target: { value: string } }) => {
    setValue('password', e.target.value, { shouldValidate: true })
  }

  return (
    <>
      <div className="max-w-[360px] overflow-y-auto flex flex-col gap-[24px]">
        <div className="flex justify-start">
          <Image src={'/images/Logo.svg'} alt="Logo" width={150} height={48} />
        </div>
        <div className="flex flex-col gap-3 text-left">
          <h2 className="text-primary font-semibold text-[24px] sm:text-[32px] leading-tight">
            Create an Account{' '}
          </h2>
          <p className="text-secondary font-semibold text-[14px] sm:text-[16px]">
            Join us and enjoy seamless chalet bookings and exclusive rewards.{' '}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
          <CommonInput
            name=""
            placeholder=""
            label="Full Name"
            className={'bg-[#F9FAFB] text-[#484A4C] rounded-[8px]'}
          />
          <div>
            <CommonInput
              icon={
                <Image src={'/images/countryFlag.svg'} alt="Country Flag" width={16} height={16} />
              }
              prefix="+965"
              name="phone"
              className={
                '!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px] text-sm sm:text-base'
              }
              type="text"
              label="Phone"
              value={watch('phone')}
              onChange={handlePhoneChange}
              maxLength={8}
              error={!!errors?.phone}
              errorMessage={errors?.phone?.message}
            />
          </div>

          <div>
            <CommonInput
              name="password"
              label="Password"
              className={'bg-[#F9FAFB]'}
              value={watch('password')}
              onChange={handlePasswordChange}
              type="password"
              error={!!errors?.password}
              errorMessage={errors?.password?.message}
            />
          </div>

          <CommonButton
            type="submit"
            disabled={isSubmitting || !isValid}
            children={isSubmitting ? 'Signing In...' : 'Continue'}
            className="w-full h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base disabled:opacity-50"
          />
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
          <span className="mx-2 text-[#DEDEDF] text-sm">OR</span>
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
        </div>

        <div className="flex justify-center items-center gap-6 w-full">
          <Image
            src="/images/googleRounded.svg"
            alt="Google"
            width={28}
            height={28}
            className="shrink-0"
          />
          <Image
            src="/images/appleRounded.svg"
            alt="Apple"
            width={28}
            height={28}
            className="shrink-0"
          />
        </div>

        <div className="flex items-center justify-start space-x-1 text-[14px] mt-4">
          <span className="text-[#484A4C]">Already have an account?</span>
          <Link href="/login" className="text-[#29397E] font-bold">
            Log in
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignUp
