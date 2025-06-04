'use client'

import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-h-screen flex flex-col md:flex-row p-4">
      <div className="w-full md:w-1/2">{children}</div>
      <div
        className="hidden md:flex flex-col justify-center px-[64px] w-1/2"
        style={{
          backgroundImage: `url('/images/AuthBanner.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '24px',
        }}
      >
        <Image src="/images/Logo-white.svg" alt="Bazar" width={322} height={120} className="mb-5" />
        <h4 className="text-[#FDFDFE] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-normal font-tenor">
          Your Escape by the Sea
        </h4>
        <p className="text-[#FDFDFE] text-[14px] sm:text-[15px] md:text-[16px] font-normal">
          Discover our handpicked sea villas—perfect for serene getaways and unforgettable moments.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout
