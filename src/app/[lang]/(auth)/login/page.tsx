'use client';

import React from 'react'
import { CommonInput, CheckBox } from '@/components'
import CommonButton from '@/components/Button/Button'
import Image from 'next/image';
const Login = () => {

  const handleChange = () => { }

  return (
    <div className='flex flex-col items-center justify-center h-[100%]'>
      <div className='max-w-[360px] flex flex-col gap-[24px]'>
        <Image src={"/images/Logo.svg"} alt=''  width={150} height={48} />
        <div className='flex flex-col gap-[12px]'>
          <h2 className='!text-primary font-600 text-[39px]'>Sign In</h2>
          <p className='!text-secondary font-600 text-[16px]'>Welcome back! Log in to manage your bookings and profile.</p>
        </div>
        <CommonInput name="fullName" placeholder='Enter your full name' type='text' label='Full Name' className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'} onChange={handleChange} />
        <CommonInput icon={<Image src={"/images/countryFlag.svg"} alt=''  width={16} height={16}/>} prefix='+965' name="phone" className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'} placeholder='Enter your phone number' type='number' label='Phone' onChange={handleChange} />
        <CommonInput name="password" placeholder='Enter your password' type='password' label='Password' className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'} onChange={handleChange} />
        <CheckBox label={"Remember Me"} />
        <CommonButton children={"Continue"} className="w-[360px] h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg" />
      </div>
    </div>
  )
}

export default Login