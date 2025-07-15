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
const RefundDepositRules: FC<{ bookingConfig: BookingConfig }> = ({ bookingConfig }) => {
  return (
    <>
      {bookingConfig?.paymentOptions.partialPayment && (
        <div className="px-5 pb-4">
          <p className="text-sm leading-4 font-normal text-[#9EA0A2]">
            You can choose to pay {bookingConfig?.paymentOptions.partialPercentage}% now and the
            remaining 72 hours before check-in, or pay the full amount upfront.
          </p>
        </div>
      )}

      <div className="px-4.5 pb-6">
        <div className="bg-[#FCE7F3] rounded-lg py-1 px-1.5">
          <p className="text-[10px] text-[#EC4899] leading-relaxed">
            A refundable security deposit of {bookingConfig?.refundPolicy.depositAmount}{' '}
            {bookingConfig?.refundPolicy.currency} is required. This amount will be held and
            returned within {bookingConfig?.refundPolicy.refundTimeframe} hours after checkout if no
            damage is reported.
          </p>
        </div>
      </div>
    </>
  )
}

export default RefundDepositRules
