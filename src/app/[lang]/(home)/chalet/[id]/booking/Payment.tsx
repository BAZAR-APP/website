import BookingSummary from '@/components/BookingSummary'
import PaymentForm from '@/components/PaymentForm'
import React from 'react'
import { Locale } from '../../../../../../../i18n.config'

interface userProps{
  lang: Locale
}


const UserInfo: React.FC<userProps> = ({lang}) => {
  return (
    <div className="max-w-[1800px] mx-auto lg:px-20 md:px-14 sm:px-10 px-8 py-9">
      <h2 className="xl:text-[39px] md:text-2xl text-xl font-semibold text-[#19191A] mb-2">{lang==='en' ? 'Secure Your Booking' : 'تأمين الحجز الخاص بك'}</h2>
      <p className="text-[#484A4C] md:text-lg text-sm mb-8">
        {
          lang==='en' ? 'Choose your payment option and complete your reservation safely.' : 'اختر طريقة الدفع الخاصة بك وأكمل حجزك بأمان.'
        }
      </p>
      <div className="flex flex-col lg:flex-row gap-4 border-b border-[#E5E7EB] pb-3">
        <div className="flex-1">
          <PaymentForm lang={lang} />
        </div>

        <div className="w-full xl:w-1/3 pb-7 px-3">
          <div className="sticky top-8">
            <BookingSummary showBookButton={true} showRedeemeCodeSection={true} lang={lang} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
