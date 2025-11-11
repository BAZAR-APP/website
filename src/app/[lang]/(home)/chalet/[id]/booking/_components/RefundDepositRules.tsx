import React, { FC } from 'react'
import { Locale } from '../../../../../../../../i18n.config'
interface BookingConfig {
  lang: Locale
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
const RefundDepositRules: FC<{ bookingConfig: BookingConfig }> = ({ bookingConfig, lang }) => {
  return (
    <>
      {bookingConfig?.paymentOptions.partialPayment && (
        <div className="px-5 pb-4">
          <p className="text-sm leading-4 font-normal text-[#9EA0A2]">
           {lang === 'en'
            ? `You can choose to pay ${bookingConfig?.paymentOptions.partialPercentage}% now and the remaining 72 hours before check-in, or pay the full amount upfront.`
            : `يمكنك اختيار دفع ${bookingConfig?.paymentOptions.partialPercentage}% الآن ودفع المبلغ المتبقي قبل تسجيل الوصول بـ 72 ساعة، أو دفع المبلغ الكامل مقدمًا.`}
          </p>
        </div>
      )}

      <div className="px-4.5 pb-6">
        <div className="bg-[#FCE7F3] rounded-lg py-1 px-1.5">
          <p className="text-[10px] text-[#EC4899] leading-relaxed">
           {lang === 'en'
            ? `A refundable security deposit of ${bookingConfig?.refundPolicy.depositAmount} ${bookingConfig?.refundPolicy.currency} is required. This amount will be held and returned within ${bookingConfig?.refundPolicy.refundTimeframe} hours after checkout if no damage is reported.`
            : `مطلوب وديعة تأمين قابلة للاسترداد بقيمة ${bookingConfig?.refundPolicy.depositAmount} ${bookingConfig?.refundPolicy.currency}. سيتم حجز هذا المبلغ وإرجاعه خلال ${bookingConfig?.refundPolicy.refundTimeframe} ساعة بعد تسجيل المغادرة إذا لم يتم الإبلاغ عن أي أضرار.`}
          </p>
        </div>
      </div>
    </>
  )
}

export default RefundDepositRules
