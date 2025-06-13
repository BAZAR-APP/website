import Image from 'next/image'
import React from 'react'

const PaymentConfirmed = () => {
  return (
    <div>
      <div className="flex justify-center flex-col items-center md:w-[603px] w-full mx-auto md:px-0 px-6 my-7 min-h-[60vh]">
        <Image src="/images/PayConfirm.svg" width={117} height={117} alt="Icon" />
        <h3 className="lg:text-[39px] md:text-3xl sm:text-2xl text-xl font-semibold py-1 leading-[47px] text-[#19191A] text-center md:pt-6 pt-3 w-full">
          Points Purchased <br /> Successfully
        </h3>
        <p className="lg:text-[20px] md:text-[16px] text-sm md:leading-[28px] lg:leading-[34px] leading-5 py-1 text-[#484A4C] text-center">
          Your points have been added to your account. You can now use them for discounts and
          rewards on your next booking. Thank you for boosting your balance — happy booking!
        </p>
      </div>
    </div>
  )
}

export default PaymentConfirmed
