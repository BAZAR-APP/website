'use client';

import React from 'react'
import { Card } from '@radix-ui/themes'
import CommonInput from '@/components/CommonInput/Input'
import CommonButton from '@/components/Button/Button'
import CheckboxLabel from '@/components/CheckBox/CheckBox'

const Login = () => {

  const handleChange = () => { }

  return (
    <div className='flex flex-col items-center justify-center h-[100%]'>
      <div className='max-w-[360px] flex flex-col gap-[24px]'>
        <img src={"/images/Logo.svg"} alt='' />
        <div className='flex flex-col gap-[12px]'>
          <h2 className='!text-primary font-600 text-[39px]'>Sign In</h2>
          <p className='!text-secondary font-600 text-[16px]'>Welcome back! Log in to manage your bookings and profile.</p>
        </div>
        <CommonInput name="fullName" placeholder='Enter your full name' type='text' label='Full Name' className={''} onChange={handleChange} />
        <CommonInput name="phone" placeholder='Enter your phone number' type='tel' label='Phone' className={'bg-[#F9FAFB]'} onChange={handleChange} />
        <CommonInput name="password" placeholder='Enter your password' type='password' label='Password' className={'bg-[#F9FAFB]'} onChange={handleChange} />
        <CheckboxLabel label={"Remember Me"} />
        <CommonButton children={"Sign In"} />

      </div>
    </div>
  )
}

export default Login