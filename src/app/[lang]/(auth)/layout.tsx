'use client'

import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex flex-col md:flex-row p-4">
      <div className="w-full md:w-1/2">{children}
        <div className="absolute bottom-0 left-8 z-[10] text-text-disabled bg-white w-[70%] h-12 hidden md:block">
          © 2025 Sea Villa. All rights reserved.
        </div>

      </div>
      <div
        className="hidden md:flex flex-col justify-center px-[64px] w-1/2"
        style={{
          backgroundImage: `url('/images/AuthBanner.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '24px',
          zIndex: "1000"
        }}
      >
        <Image src="/images/Logo-white.svg" alt="Bazar" width={322} height={120} className="mb-5" />
        <h4 className="text-[#FDFDFE] text-[48px] font-normal font-tenor">
          Your Escape by the Sea
        </h4>
        <p className="text-[#FDFDFE] text-[16px] font-normal">
          Discover our handpicked sea villas—perfect for serene getaways and unforgettable moments.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout
