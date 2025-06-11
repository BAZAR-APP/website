import React from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import Button from '../Button/Button'
import Image from 'next/image'

interface SubmitReviewDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onSubmit: () => void
  onCancel?: () => void
}

const SubmitReviewDialog: React.FC<SubmitReviewDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  onCancel = () => setIsOpen(false),
}) => {
  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="lg:min-w-[524px] min-w-auto"
      title="Share Your Experience"
    >
      <p className="text-xl leading-6 text-gray-600 py-2">
        Tell us what you loved (or what we can do better). Your feedback helps us improve!
      </p>
      <div className="flex gap-1 py-2">
        {[...Array(5)].map((_, i) => (
          <Image key={i} src={'/images/Unfilld.svg'} width={40} height={40} alt="Star icon" />
        ))}
      </div>
      <div className="w-full h-[216px] flex-shrink-0">
        <Image
          src={'https://picsum.photos/seed/lakeside/311/190'}
          alt={'Images'}
          className="w-full h-full object-cover rounded-[12px]"
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 py-3">
        <Button
          onClick={onCancel}
          intent="ghost"
          className="w-full py-2 text-sm font-medium rounded-lg cursor-pointer bg-gray-50 text-gray-900"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="w-full py-2 text-sm font-medium text-white bg-indigo-800 rounded-lg cursor-pointer"
        >
          Submit Review
        </Button>
      </div>
    </ModalDialog>
  )
}

export default SubmitReviewDialog
