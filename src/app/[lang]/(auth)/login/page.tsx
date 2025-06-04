'use client'

import React from 'react'
import { CommonInput, CheckBox } from '@/components'
import CommonButton from '@/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

const Login = () => {
  const handleChange = () => { }

  return (
    <div className="flex flex-col items-center justify-center h-[100%]">
      <div className="max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]">
        <div className="flex justify-start">
          <Image src={'/images/Logo.svg'} alt="Logo" width={150} height={48} />
        </div>
        <div className="flex flex-col gap-3 text-left">
          <h2 className="text-primary font-semibold text-[32px] sm:text-[39px] leading-tight">
            Sign In
          </h2>
          <p className="text-secondary font-semibold text-[14px] sm:text-[16px]">
            Welcome back! Log in to manage your bookings and profile.
          </p>
        </div>

        <CommonInput
          icon={<Image src={'/images/countryFlag.svg'} alt="Country Flag" width={16} height={16} />}
          prefix="+965"
          name="phone"
          className={
            '!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px] text-sm sm:text-base'
          }
          type="number"
          label="Phone"
          onChange={handleChange}
        />

        <CommonInput
          name=""
          placeholder=""
          label="Password"
          className={'bg-[#F9FAFB]'}
          onChange={handleChange}
          type='password'
        />

        <div className="flex justify-between text-sm sm:text-base">
          <CheckBox label={'Remember Me'} />
          <Link href="/forget-password" className="text-[#29397E] font-bold underline">
            Forget Password?
          </Link>
        </div>

        <CommonButton
          children={'Continue'}
          className="w-full h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base"
        />

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

        <div className="flex items-center justify-center space-x-1 text-[14px] mt-4">
          <span className="text-[#484A4C]">Don't have an account?</span>
          <Link href="/register" className="text-[#29397E] font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
