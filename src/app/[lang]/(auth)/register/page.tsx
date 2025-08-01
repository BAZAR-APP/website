'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommonInput, CheckBox } from '@/components'
import CommonButton from '@/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { loginSchema, registerSchema } from '@/lib/validationSchemas'
import api from '@/lib/axios'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { sendSMS } from '../verify-account/page'
interface LoginFormInputs {
  phone: string
  password: string
  fullName: string
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
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: '',
      password: '',
      fullName: '',
    },
  })

  const onSubmit = async (data: LoginFormInputs): Promise<void> => {
    try {
      const body = {
        fullName: data?.fullName.trim(),
        phoneNumber: data?.phone,
        callingCode: '+965',
        countryCode: 'KW',
        password: data?.password,
        authProvider: 'phone',
      }
      const res = await api.post('/auth/signUp', body)
      console.log(res);
      
      await sendSMS({ phoneNumber: ('+965' + data?.phone) as string, message: res?.data?.otpCode })
      router.push(
        `/verify-account?userId=${encodeURIComponent(res?.data?.userId)}&phone=${data?.phone}`,
      )
    } catch (error) {
      toast.error(extractErrorMessage(error))
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
      <div className="max-w-[80%] min-[1440px]:max-w-[360px] overflow-y-auto flex flex-col justify-center gap-[8px]">
        <div className="flex justify-start">
          <Image
            src={'/images/Logo.svg'}
            alt="Logo"
            width={150}
            height={48}
            className="min-[1440px]:py-3"
          />
        </div>
        <div className="flex flex-col text-left">
          <h2 className="text-primary font-semibold min-[1440px]:py-3 text-[24px] max-[1440px]:text-[32px] min-[1441px]:text-[39px] leading-tight">
            Create an Account{' '}
          </h2>
          <p className="text-secondary font-normal text-[14px] sm:text-[16px]">
            Join us and enjoy seamless chalet bookings and exclusive rewards.{' '}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-[1440px]:gap-3.5 gap-[8px] min-[1440px]:pt-4"
        >
          <CommonInput
            name="fullName"
            placeholder=""
            value={watch('fullName')}
            onChange={(e) => setValue('fullName', e.target.value, { shouldValidate: true })}
            label="Full Name"
            className={'bg-[#F9FAFB] text-[#484A4C] rounded-[8px]'}
            error={!!errors?.fullName}
            errorMessage={errors?.fullName?.message}
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
              autoComplete="new-password"
              type="password"
              error={!!errors?.password}
              errorMessage={errors?.password?.message}
            />
          </div>

          <CommonButton
            type="submit"
            disabled={isSubmitting || !isValid}
            children={isSubmitting ? 'Signing In...' : 'Sign Up'}
            className="w-full h-[48px] bg-[#29397E] text-white gap-2 pr-5 py-1 pl-1 min-[1440px]:my-3 rounded-lg text-base disabled:opacity-50"
          />
        </form>

        <div className="flex items-center min-[1440px]:mt-1">
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
          <span className="mx-2 text-[#DEDEDF] text-[16px]">OR</span>
          <div className="flex-grow border-t border-[#DEDEDF]"></div>
        </div>

        <div className="flex justify-center items-center gap-6 w-full min-[1440px]:my-3">
          <button
            onClick={() =>
              signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_URL}/explore/` })
            }
            className="shrink-0"
          >
            <Image src="/images/googleRounded.svg" alt="Login with Google" width={40} height={40} />
          </button>
          <Image
            src="/images/appleRounded.svg"
            alt="Apple"
            width={40}
            height={40}
            className="shrink-0"
          />
        </div>

        <div className="flex items-center justify-start text-[14px] min-[1440px]:mt-1">
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
