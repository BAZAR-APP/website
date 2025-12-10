import Image from 'next/image'
import React, { FC } from 'react'
interface BookingConfig {
  refundableDeposit: number
  currency: string
  paymentOptions: {
    partialPayment: boolean
    partialPercentage: number
    fullPaymentUpfront: boolean
  }
  refundPolicy: {
    depositAmount: number
    refundTimeframe: number
    currency: string
  }
}
const PackagePricingSummary: FC<{ bookingConfig: BookingConfig; total: number; additionFeeForFullRefund?: number }> = ({
  bookingConfig,
  total,
  additionFeeForFullRefund,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-[16px] font-normal text-[#19191A] flex items-center">
            Refundable Deposit
          </span>
          <div className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center">
            <Image src={'/images/Deposit.svg'} width={15} height={15} alt="Deposit icon" />
          </div>
        </div>
        <span className="font-normal text-[16px] text-[#19191A]">
          {bookingConfig.refundableDeposit} {bookingConfig.currency}
        </span>
      </div>



      <div className="border-t border-[#DEDEDF] pt-3">
        <div className="flex justify-between items-center font-medium text-[16px] text-[#19191A]">
          <span>Total</span>
          <span>
            {total} {bookingConfig.currency}
          </span>
        </div>
      </div>
    </>
  )
}

export default PackagePricingSummary
