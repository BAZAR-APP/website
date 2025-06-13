import React from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import Image from 'next/image'
import Button from '../Button/Button'
import { ChevronRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

interface CancelBookingProps {
  isOpen: boolean
  setIsOpen: () => void
  onCancel?: () => void
  onGoBack?: () => void
}
const CancelBooking: React.FC<CancelBookingProps> = ({ isOpen, setIsOpen, onCancel, onGoBack }) => {
  const router = useRouter()
  const params = useParams()
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
        Are you sure you want to cancel this booking?
      </h3>
      <p className="md:text-xl text-[14px] leading-[24px] md:py-4 py-2 text-center text-[#484A4C]">
        This action cannot be undone. Please review your cancellation policy before proceeding.
      </p>
      <div className="text-center w-full mx-auto md:mb-6 mb-2">
        <Button
          intent="transperent"
          className="cursor-pointer !py-0 !px-0 w-full flex gap-2.5 items-center justify-center text-[16px] !text-[#29397E] font-medium underline underline-offset-3"
          onClick={() => router.push(`/explore/booking/${params.id}/cancellation-policy`)}
        >
          Cancellation Policy <ChevronRight className="w-3 h-3" strokeWidth={3} />
        </Button>
      </div>
      <div className="flex md:flex-row flex-col justify-between gap-4 py-3">
        <Button
          onClick={() => {
            onGoBack?.()
            setIsOpen()
          }}
          intent="ghost"
          className="cursor-pointer bg-[#F3F4F6] text-[#19191A] py-2 rounded-lg text-[16px] font-medium w-full"
        >
          Go Back
        </Button>
        <Button
          onClick={() => {
            onCancel?.()
            setIsOpen()
          }}
          className="cursor-pointer bg-[#29397E] !text-[#FDFDFE] py-2 rounded-lg text-[16px] font-medium !w-full"
        >
          Yes , Cancel Booking
        </Button>
      </div>
    </ModalDialog>
  )
}

export default CancelBooking
