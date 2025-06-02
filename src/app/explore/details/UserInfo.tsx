import BookingSummary from '@/components/BookingSummary'
import Button from '@/components/Button/Button'
import ContactForm from '@/components/ContactForm'
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
  const handleFormSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data)
    onNext()
  }
  return (
    <div className="max-w-7xl mx-auto lg:px-24 md:px-18 px-10 py-9">
      <h2 className="text-2xl font-semibold text-[#19191A] mb-2">Your Details</h2>
      <p className="text-[#484A4C] text-lg mb-8">
        Please provide your name and contact info to complete the booking.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ContactForm onSubmit={handleFormSubmit} />
        </div>

        <div className="lg:col-span-1 pb-7 px-3">
          <div className="sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Summary</h3>
            <BookingSummary />
          </div>
        </div>
      </div>
      <div className=" border-t border-[#E5E7EB] pt-7">
        <Button
          onClick={() => onNext()}
          type="submit"
          className="cursor-pointer px-3.5 text-white py-3 bg-[#29397E] rounded-md font-medium"
        >
          Confirm Contact Info
        </Button>
      </div>
    </div>
  )
}

export default UserInfo
