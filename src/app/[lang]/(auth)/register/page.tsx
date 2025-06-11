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
import api from '@/lib/axios'
interface LoginFormInputs {
  phone: string
  password: string
  rememberMe?: boolean
  fullName?:string
}
interface PhoneChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

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
      const body = {
        fullName: 'Test phone',
        phoneNumber: '3127786000',
        callingCode: '+92',
        countryCode: 'PK',
        password: 'Qwerty@123',
        authProvider: 'phone',
      }
      await api.post('/auth/signUp')
      // router.push('/verify-account')
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
      <div className="max-w-[80%] min-[1440px]:max-w-[360px] overflow-y-auto flex flex-col gap-[8px]">
        <div className="flex justify-start">
          <Image src={'/images/Logo.svg'} alt="Logo" width={150} height={48} />
        </div>
        <div className="flex flex-col text-left">
          <h2 className="text-primary font-semibold text-[24px] max-[1440px]:text-[32px] min-[1441px]:text-[39px] leading-tight">
            Create an Account{' '}
          </h2>
          <p className="text-secondary font-normal text-[14px] sm:text-[16px]">
            Join us and enjoy seamless chalet bookings and exclusive rewards.{' '}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[8px]">
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
            children={isSubmitting ? 'Signing In...' : 'Sign Up'}
            className="w-full h-[48px] bg-[#29397E] text-white gap-2 pr-5 py-1 pl-1 rounded-lg text-base disabled:opacity-50"
          />
        </form>

        <div className="flex items-center">
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
          <span className="mx-2 text-[#DEDEDF] text-sm">OR</span>
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
        </div>

        <div className="flex justify-center items-center gap-6 w-full">
          <Image
            src="/images/googleRounded.svg"
            alt="Google"
            width={35}
            height={35}
            className="shrink-0"
          />
          <Image
            src="/images/appleRounded.svg"
            alt="Apple"
            width={35}
            height={35}
            className="shrink-0"
          />
        </div>

        <div className="flex items-center justify-start text-[14px]">
          <span className="text-[#484A4C] mr-1">Already have an account?</span>
          <Link href="/login" className="text-[#29397E] font-bold">
            Log in
          </Link>
        </div>
      </div>
    </>
  )
}

export default SignUp
