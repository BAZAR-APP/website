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
import { getSession, signIn, useSession } from 'next-auth/react'

import axios from 'axios'
import { toast } from '@/lib/toast'
interface LoginFormInputs {
  phone: string
  password: string
  rememberMe?: boolean
}
interface PhoneChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Login = () => {
  const router = useRouter()
  const { status, data: session } = useSession()

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
      const result = await signIn('credentials', {
        redirect: false,
        phoneNumber: data?.phone,
        callingCode: '+965',
        countryCode: 'KW',
        password: data?.password,
        authProvider: 'phone',
        // callbackUrl : lang !== 'fr' ? `${getEnv('NEXT_PUBLIC_URL')}/${lang}/login` : `${getEnv('NEXT_PUBLIC_URL')}/login`
      })
      if (result?.ok) {
      } else {
        toast.error(result?.error ?? '')
      }

      // router.push('/')
    } catch (error) {
      console.log('Login error:', error)
    }
  }

  const handlePhoneChange = (e: PhoneChangeEvent): void => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8)
    setValue('phone', value, { shouldValidate: true })
  }

  const handlePasswordChange = (e: { target: { value: string } }) => {
    setValue('password', e.target.value, { shouldValidate: true })
  }

  const handleRememberMeChange = (checked: boolean): void => {
    setValue('rememberMe', checked)
  }

  return (
    <>
      <div className="max-w-[360px] overflow-y-auto flex flex-col gap-[4px]">
        <div className="flex justify-start">
          <Image src={'/images/Logo.svg'} alt="Logo" width={150} height={48} />
        </div>
        <div className="flex flex-col gap-3 text-left">
          <h2 className="text-primary font-semibold text-[24px] max-[1440px]:text-[32px] min-[1441px]:text-[39px] leading-tight">
            Sign In
          </h2>
          <p className="text-secondary font-normal text-[14px] sm:text-[16px]">
            Welcome back! Log in to manage your bookings and profile.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[16px]">
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

          <div className="flex justify-between text-sm sm:text-base">
            <CheckBox
              label={'Remember Me'}
              checked={watch('rememberMe')}
              onChange={handleRememberMeChange}
            />
            <Link href="/forget-password" className="text-[#29397E] font-bold underline">
              Forget Password?
            </Link>
          </div>

          <CommonButton
            type="submit"
            disabled={isSubmitting || !isValid}
            children={isSubmitting ? 'Signing In...' : 'Sign In'}
            className="w-full h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base disabled:opacity-50"
          />
        </form>

        <div className="flex items-center">
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
          <span className="mx-2 text-[#DEDEDF] text-sm">OR</span>
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
        </div>

        <div className="flex justify-center items-center gap-6 w-full">
          <button
            onClick={() =>
              signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_URL}/explore/chalets` })
            }
            className="shrink-0"
          >
            <Image src="/images/googleRounded.svg" alt="Login with Google" width={35} height={35} />
          </button>

          <Image
            src="/images/appleRounded.svg"
            alt="Apple"
            width={35}
            height={35}
            className="shrink-0"
          />
        </div>

        <div className="flex items-center justify-center space-x-1 text-[14px]">
          <span className="text-[#484A4C]">Don't have an account?</span>
          <Link href="/register" className="text-[#29397E] font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
