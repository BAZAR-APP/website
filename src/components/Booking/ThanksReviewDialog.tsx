import React from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import Image from 'next/image'
import Button from '../Button/Button'
import { useRouter } from 'next/navigation'

interface ThanksReviewDialogProps {
  isOpen: boolean
  setIsOpen: () => void
}
const ThanksReviewDialog: React.FC<ThanksReviewDialogProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter()
  return (
    <ModalDialog isOpen={isOpen} setIsOpen={setIsOpen} className='md:min-w-[480px] min-w-auto'>
      <div className="text-center">
        <Image
          src="/images/PayConfirm.svg"
          width={120}
          height={120}
          alt="Success"
          className="mx-auto"
        />
        <h3 className="text-xl font-semibold mt-4 text-[#19191A] pt-3">Thanks for Your Review!</h3>
        <p className="lg:text-xl text-sm text-[#484A4C] inline-block mt-2">
          Your feedback has been submitted successfully. We appreciate you taking the time to share
          your experience — you’ve just earned 200 points!
        <span className="inline-flex bg-[#E1F3FF] ml-2 items-center gap-1 rounded py-1 px-1.5 max-w-[110px]">
          <Image src="/images/Points.svg" width={16} height={16} alt="Points Icon" />
          <span className="text-[#29397E] text-sm">200 Points</span>
        </span>
        </p>
        <div className="flex md:flex-row flex-col justify-between gap-4 pt-8">
          <Button
            onClick={() => router.push('/explore/booking/')}
            intent="ghost"
            className="cursor-pointer bg-[#F3F4F6] text-[#19191A] py-2 rounded-lg text-sm font-medium w-full"
          >
            Back to My Bookings
          </Button>
          <Button
            onClick={() => router.push('/explore/chalets/')}
            className="cursor-pointer bg-[#29397E] text-white py-2 rounded-lg text-sm font-medium !w-full"
          >
            Browse Chalets
          </Button>
        </div>
      </div>
    </ModalDialog>
  )
}

export default ThanksReviewDialog
