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
import { signIn } from 'next-auth/react'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import api from '@/lib/axios'

interface LoginFormInputs {
  phone: string
  password: string
  rememberMe?: boolean
}
interface PhoneChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Login = () => {
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
      const result = await signIn('credentials', {
        redirect: false,
        phoneNumber: data?.phone,
        callingCode: '+965',
        countryCode: 'KW',
        password: data?.password,
        authProvider: 'phone',
      })

      if (result?.ok) {
        router.replace(`/`)
      } else {
        let errorMessage = result?.error ?? 'Login failed'
        if (errorMessage?.includes('Phone number not verified')) {
          const res = await api.post('/users/public/sendOTP', {
            phoneNumber: data?.phone,
            callingCode: '+965',
          })
          router.push(`/verify-account?userId=${res?.data?.id}&phone=${data?.phone}`)
        }
        if (errorMessage.includes('Only customers can login')) {
          errorMessage = 'Access denied. This application is only available for customers.'
        }

        toast.error(errorMessage)
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      if (errorMessage.includes('Only customers can login')) {
        toast.error('Access denied. This application is only available for customers.')
      } else {
        toast.error(errorMessage)
      }
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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}/explore/`,
        redirect: false,
      })

      if (result?.ok) {
        router.replace('/explore/')
      } else if (result?.error) {
        let errorMessage = result.error

        if (errorMessage.includes('Only customers can login')) {
          errorMessage = 'Access denied. This application is only available for customers.'
        }

        toast.error(errorMessage)
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error)

      if (errorMessage.includes('Only customers can login')) {
        toast.error('Access denied. This application is only available for customers.')
      } else {
        toast.error(errorMessage)
      }
    }
  }

  const handleAppleSignIn = async () => {
    try {
      const result = await signIn('apple', {
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}/explore/`,
        redirect: false,
      })

      if (result?.ok) {
        router.replace('/explore/')
      } else if (result?.error) {
        let errorMessage = result.error

        if (errorMessage.includes('Only customers can login')) {
          errorMessage = 'Access denied. This application is only available for customers.'
        }

        toast.error(errorMessage)
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error)

      if (errorMessage.includes('Only customers can login')) {
        toast.error('Access denied. This application is only available for customers.')
      } else {
        toast.error(errorMessage)
      }
    }
  }

  return (
    <>
      <div className="max-w-[360px] overflow-y-auto flex flex-col justify-center gap-[4px]">
        <div className="flex justify-start">
          <Image
            src={'/images/Logo.svg'}
            alt="Logo"
            width={150}
            height={48}
            className="min-[1440px]:py-3"
          />
        </div>
        <div className="flex flex-col gap-3 text-left">
          <h2 className="text-primary font-semibold min-[1440px]:pt-3 text-[24px] max-[1440px]:text-[32px] min-[1441px]:text-[39px] leading-tight">
            Sign In
          </h2>
          <p className="text-secondary font-normal text-[14px] min-[1440px]:pb-4 min-[1440px]:pt-1.5 sm:text-[16px]">
            Welcome back! Log in to manage your bookings and profile.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-col min-[1440px]:gap-6 gap-[16px]"
        >
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
              autoComplete="off"
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
              autoComplete="new-password"
              className={'bg-[#F9FAFB]'}
              value={watch('password')}
              onChange={handlePasswordChange}
              type="password"
              error={!!errors?.password}
              errorMessage={errors?.password?.message}
            />
          </div>

          <div className="flex justify-between min-[1440px]:mt-1 text-sm">
            <CheckBox
              label={'Remember Me'}
              checked={watch('rememberMe')}
              onChange={handleRememberMeChange}
              className="text-[#484A4C] font-normal"
            />
            <Link
              href="/forgot-password"
              className="text-[#29397E] font-medium text-sm underline underline-offset-2"
            >
              Forget Password?
            </Link>
          </div>

          <CommonButton
            type="submit"
            disabled={isSubmitting || !isValid}
            children={isSubmitting ? 'Signing In...' : 'Sign In'}
            className="w-full h-[48px] bg-[#29397E] !text-[#FDFDFE] min-[1440px]:my-3 gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base disabled:opacity-50"
          />
        </form>

        <div className="flex items-center min-[1440px]:mt-1">
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
          <span className="mx-2 text-[#DEDEDF] text-[16px]">OR</span>
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
        </div>

        <div className="flex justify-center items-center gap-6 w-full min-[1440px]:my-3">
          <button
            onClick={handleGoogleSignIn}
            className="shrink-0 hover:opacity-80 transition-opacity"
            type="button"
            title="Sign in with Google"
          >
            <Image src="/images/googleRounded.svg" alt="Login with Google" width={40} height={40} />
          </button>
          <button
            onClick={handleAppleSignIn}
            className="shrink-0 hover:opacity-80 transition-opacity"
            type="button"
            title="Sign in with Apple"
          >
            <Image src="/images/appleRounded.svg" alt="Login with Apple" width={40} height={40} />
          </button>
        </div>

        <div className="flex items-center justify-start space-x-1 min-[1440px]:mt-4 text-[14px]">
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
