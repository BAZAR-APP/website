import Image from 'next/image'
import React from 'react'

const PaymentConfirmed = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Image src={'/images/PayConfirm.svg'} width={117} height={117} alt="Icon" />
      <h3 className="md:text-4xl text-2xl font-semibold py-1 leading-[47px] text-[#19191A] text-center w-full">
        Payment Confirmed
      </h3>
      <p className="text-[20px] font-normal leading-[24px] py-1 text-[#484A4C] text-center w-full">
        Your booking is complete. Thank you for choosing us! <br />
        You earned 200 points. Track and redeem them in your profile anytime!
      </p>
    </div>
  )
}

export default PaymentConfirmed
