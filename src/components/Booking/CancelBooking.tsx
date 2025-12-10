import React from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import Image from 'next/image'
import Button from '../Button/Button'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Locale } from '../../../i18n.config'

interface PriceBreakdownItem {
  description: string
  amount: number
}

type PaymentStatus = 'fullPaid' | 'halfPaid'

interface CancelBookingProps {
  isOpen: boolean
  setIsOpen: () => void
  onCancel?: () => void
  onGoBack?: () => void
  isCancelling: boolean
  refundAmount?: number
  lang?: Locale
  priceBreakdown?: PriceBreakdownItem[]
  paymentStatus?: PaymentStatus
  totalAmount?: number
  calculatedRefundAmount?: number
}
const CancelBooking: React.FC<CancelBookingProps> = ({
  isOpen,
  setIsOpen,
  onCancel,
  onGoBack,
  isCancelling,
  refundAmount,
  lang = 'en',
  priceBreakdown = [],
  paymentStatus,
  totalAmount,
  calculatedRefundAmount,
}) => {
  const router = useRouter()

  const statusConfig = {
    fullPaid: {
      bgColor: 'bg-[#D1FAE5]',
      textColor: 'text-[#10B981]',
      icon: '/images/paid.svg',
      text: lang === 'en' ? 'Fully Paid' : 'مدفوع بالكامل',
    },
    halfPaid: {
      bgColor: 'bg-[#FCE7F3]',
      textColor: 'text-[#EC4899]',
      icon: '/images/discount.svg',
      text: lang === 'en' ? '50% Paid' : 'مدفوع 50%',
    },
  }

  const config = paymentStatus ? statusConfig[paymentStatus] : null
  const totalBreakdown = priceBreakdown.reduce((sum, item) => sum + (item.amount || 0), 0)

  return (
    <ModalDialog isOpen={isOpen} setIsOpen={setIsOpen} className="lg:min-w-[524px] min-w-[auto]">
      <Image
        src={'/images/save-info.svg'}
        width={170}
        height={170}
        className="text-center mx-auto lg:pb-7 md:pb-4 pb-2"
        alt="Save icon"
      />
      <h3 className="lg:text-[25px] text-xl text-[16px] lg:leading-9 leading-6 font-semibold text-center text-[#19191A]">
        {lang === 'en' ? 'Are you sure you want to cancel this booking?' : 'هل أنت متأكد أنك تريد إلغاء هذا الحجز؟'}
      </h3>
      <p className="md:text-xl text-[14px] leading-[24px] md:py-4 py-2 text-center text-[#484A4C]">
        {lang === 'en' 
          ? 'This action cannot be undone. Please review your cancellation policy before proceeding.'
          : 'لا يمكن التراجع عن هذا الإجراء. يرجى مراجعة سياسة الإلغاء قبل المتابعة.'}
      </p>

      {/* Payment Details Section */}
      {priceBreakdown.length > 0 && (
        <div className="bg-[#F9FAFB] rounded-[16px] py-4 px-4 my-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg leading-6 text-[#19191A]">
              {lang === 'en' ? 'Payment Details' : 'تفاصيل الدفع'}
            </h4>
            {config && (
              <div
                className={`flex ${config.bgColor} ${config.textColor} rounded-md px-1.5 py-1 text-sm gap-0.5`}
              >
                <Image src={config.icon} width={20} height={20} alt="Payment status icon" />
                {config.text}
              </div>
            )}
          </div>

          <div className="space-y-3 mb-4 text-base leading-[19px] text-[#19191A]">
            {priceBreakdown.map((item, index) => (
              <div key={`${item.description}-${index}`} className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  {item.description}
                  {(item.description === 'Refundable Deposit' || item.description === 'الوديعة القابلة للاسترداد') && (
                    <Image src="/images/Deposit.svg" width={15} height={15} alt="Deposit icon" />
                  )}
                </span>
                <span>{item.amount} {lang === 'en' ? 'KWD' : 'دينار كويتي'}</span>
              </div>
            ))}

            <hr className="border-[#D1D5DB]" />
            <div className="flex justify-between items-center font-medium text-[#19191A] text-[16px]">
              <span>{lang === 'en' ? 'Total' : 'المجموع'}</span>
              <span>
                {totalBreakdown} {lang === 'en' ? 'KWD' : 'دينار كويتي'}
              </span>
            </div>
            {calculatedRefundAmount !== undefined && calculatedRefundAmount > 0 && (
              <div className="flex justify-between items-center text-sm font-medium text-[#10B981] mt-2">
                <span>{lang === 'en' ? 'Refund Amount' : 'مبلغ الاسترداد'}</span>
                <span>
                  {calculatedRefundAmount.toFixed(2)} {lang === 'en' ? 'KWD' : 'دينار كويتي'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {refundAmount !== undefined && refundAmount > 0 && (
        <div className="bg-[#D1FAE5] rounded-lg py-3 px-4 my-4">
          <p className="text-sm font-medium text-[#10B981] text-center">
            {lang === 'en' 
              ? `Refund Amount: ${refundAmount.toFixed(2)} KWD`
              : `مبلغ الاسترداد: ${refundAmount.toFixed(2)} دينار كويتي`}
          </p>
          <p className="text-xs text-[#059669] text-center mt-1">
            {lang === 'en'
              ? 'This amount will be refunded according to the cancellation policy.'
              : 'سيتم استرداد هذا المبلغ وفقًا لسياسة الإلغاء.'}
          </p>
        </div>
      )}
      <div className="text-center w-full mx-auto md:mb-6 mb-2">
        <Button
          intent="transperent"
          className="cursor-pointer !py-0 !px-0 w-full flex gap-2.5 items-center justify-center text-[16px] !text-[#29397E] font-medium underline underline-offset-3"
          onClick={() => router.push(`/cancellation-policy`)}
        >
          {lang === 'en' ? 'Cancellation Policy' : 'سياسة الإلغاء'} <ChevronRight className="w-3 h-3" strokeWidth={3} />
        </Button>
      </div>
      <div className="flex md:flex-row flex-col justify-between gap-4 py-3">
        <Button
          onClick={() => {
            onGoBack?.()
            setIsOpen()
          }}
          intent="ghost"
          disabled={isCancelling}
          className="cursor-pointer bg-[#F3F4F6] text-[#19191A] py-2 rounded-lg text-[16px] font-medium w-full"
        >
          {lang === 'en' ? 'Go Back' : 'رجوع'}
        </Button>
        <Button
          onClick={() => {
            onCancel?.()
          }}
          disabled={isCancelling}
          loading={isCancelling}
          className="cursor-pointer bg-[#29397E] !text-[#FDFDFE] py-2 rounded-lg text-[16px] font-medium !w-full"
        >
          {lang === 'en' ? 'Yes, Cancel Booking' : 'نعم، إلغاء الحجز'}
        </Button>
      </div>
    </ModalDialog>
  )
}

export default CancelBooking
