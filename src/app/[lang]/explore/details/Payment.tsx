import BookingSummary from '@/components/BookingSummary'
import PaymentForm from '@/components/PaymentForm'
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

  return (
    <div className="max-w-7xl mx-auto lg:px-24 md:px-18 sm:px-10 px-8 py-9">
      <h2 className="md:text-2xl text-xl font-semibold text-[#19191A] mb-2">Secure Your Booking</h2>
      <p className="text-[#484A4C] md:text-lg text-sm mb-8">
        Choose your payment option and complete your reservation safely.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <PaymentForm />
        </div>

        <div className="lg:col-span-1 pb-7 px-3">
          <div className="sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Summary</h3>
            <BookingSummary showBookButton={true} couponCode={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
