import BookingSummary from '@/components/BookingSummary'
import Button from '@/components/Button/Button'
import ContactForm from '@/components/ContactForm'
import ModalDialog from '@/components/ModalDialog/Dialog'
import useToggle from '@/lib/hooks/useToggle'
import Image from 'next/image'
import React from 'react'

type UserInfoProps = {
  onNext: () => void
}
interface ContactFormData {
  fullName: string
  phone: string
  email: string
  address: string
}
const UserInfo: React.FC<UserInfoProps> = ({ onNext }) => {
  const { isOpen, toggle } = useToggle(false)
  const handleFormSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data)
  }
  return (
    <>
      <div className="max-w-[1800px] mx-auto lg:px-24 md:px-18 px-10 py-9">
        <h2 className="lg:text-[39px] md:text-2xl text-xl font-semibold text-[#19191A] mb-2">
          Your Details
        </h2>
        <p className="text-[#484A4C] sm:text-lg text-sm mb-8">
          Please provide your name and contact info to complete the booking.
        </p>
        <div className="flex justify-between flex-wrap md:gap-2 gap-10">
          <ContactForm  />

          <div className="pb-7 md:px-3">
            <BookingSummary couponCode />
          </div>
        </div>
        <div className=" border-t border-[#E5E7EB] pt-7">
          <Button
            onClick={toggle}
            type="submit"
            size="responsive"
            className="cursor-pointer text-white py-3 font-medium w-[200px]"
          >
            Confirm Contact Info
          </Button>
        </div>
      </div>
      <ModalDialog isOpen={isOpen} setIsOpen={toggle} className="lg:min-w-[524px] min-w-[auto]">
        <Image
          src={'/images/save-info.svg'}
          width={170}
          height={170}
          className="text-center mx-auto md:pb-4 pb-1"
          alt="Save icon"
        />
        <h3 className="lg:text-[25px] text-xl text-[16px] lg:leading-9 leading-6 font-semibold text-center text-[#19191A]">
          Would you like to save these details for faster booking next time?
        </h3>
        <p className="md:text-xl text-[14px] leading-[24px] md:py-4 py-2 text-center text-[#484A4C]">
          You can manage saved info anytime from your profile settings.
        </p>
        <div className="flex md:flex-row flex-col justify-between gap-4 py-3">
          <Button
            onClick={() => onNext()}
            intent="ghost"
            className="cursor-pointer bg-[#F3F4F6] text-[#19191A] py-2 rounded-lg text-sm font-medium w-full"
          >
            No, Just Continue
          </Button>
          <Button
            onClick={() => onNext()}
            className="cursor-pointer bg-[#29397E] text-white py-2 rounded-lg text-sm font-medium !w-full"
          >
            Save & Continue
          </Button>
        </div>
      </ModalDialog>
    </>
  )
}

export default UserInfo
