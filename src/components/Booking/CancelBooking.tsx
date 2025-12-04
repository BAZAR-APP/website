import React from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import Image from 'next/image'
import Button from '../Button/Button'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Locale } from '../../../i18n.config'

interface CancelBookingProps {
  isOpen: boolean
  setIsOpen: () => void
  onCancel?: () => void
  onGoBack?: () => void
  isCancelling: boolean
  refundAmount?: number
  lang?: Locale
}
const CancelBooking: React.FC<CancelBookingProps> = ({
  isOpen,
  setIsOpen,
  onCancel,
  onGoBack,
  isCancelling,
  refundAmount,
  lang = 'en',
}) => {
  const router = useRouter()
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
