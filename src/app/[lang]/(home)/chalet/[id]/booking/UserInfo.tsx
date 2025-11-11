import BookingSummary from '@/components/BookingSummary'
import Button from '@/components/Button/Button'
import ContactForm from '@/components/ContactForm'
import ModalDialog from '@/components/ModalDialog/Dialog'
import api from '@/lib/axios'
import useToggle from '@/lib/hooks/useToggle'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Locale } from '../../../../../../../i18n.config'

type UserInfoProps = {
  onNext: () => void
  lang : Locale
}
interface ContactFormData {
  fullName: string
  phone: string
  email: string
  address: string
}
const UserInfo: React.FC<UserInfoProps> = ({ onNext, lang }) => {
  const { isOpen, toggle } = useToggle(false)
  const { data: user, update } = useSession()
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  })

  useEffect(() => {
    if (user?.user?.id) {
      setFormData({
        fullName: user?.user?.fullName,
        email: user?.user?.email || '',
        phone: user?.user?.phoneNumber || '',
        address: user?.user?.city,
      })
    }
  }, [user])
  const handleFormSubmit = async () => {
    setLoading(true)
    try {
      const body = {
        fullName: formData?.fullName,
        phoneNumber: formData?.phone,
        callingCode: '+965',
        countryCode: 'KW',
        isUpdatingAddress: false,
        email: formData?.email,
      }
      await api.patch('/users/updateProfile', body)
      await update()
      onNext()
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="max-w-[1800px] mx-auto lg:px-24 md:px-18 px-10 py-9">
        <h2 className="lg:text-[39px] md:text-2xl text-xl font-semibold text-[#19191A] mb-2">
          {
            lang==='en' ? 'Your Details' : 'التفاصيل الخاصة بك'
          }
        </h2>
        <p className="text-[#484A4C] sm:text-lg text-sm mb-8">
          {
            lang==='en' ? 'Please provide your name and contact info to complete the booking.' : 'يرجى تقديم اسمك ومعلومات الاتصال الخاصة بك لإكمال الحجز.'
          }
        </p>
        <div className="flex justify-between flex-wrap md:gap-2 gap-10">
          <ContactForm
            onChange={(field, value) => {
              setFormData((prev) => ({ ...prev, [field]: value }))
            }}
            formData={formData}
            lang={lang}
          />

          <div className="pb-7 md:px-3">
            <BookingSummary showRedeemeCodeSection />
          </div>
        </div>
        <div className=" border-t border-[#E5E7EB] pt-7">
          <Button
            onClick={toggle}
            type="submit"
            size="responsive"
            className="cursor-pointer text-white py-3 font-medium w-[200px]"
          >
            {
              lang==='en' ? 'Confirm Contact Info' : 'تأكيد معلومات الاتصال'
            }
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
          {
            lang ==='en' ? 'Would you like to save these details for faster booking next time?' : 'هل ترغب في حفظ هذه التفاصيل لتتمكن من الحجز بشكل أسرع في المرة القادمة؟'
          }
        </h3>
        <p className="md:text-xl text-[14px] leading-[24px] md:py-4 py-2 text-center text-[#484A4C]">
          {
            lang==='en' ? 'You can manage saved info anytime from your profile settings.' : 'يمكنك إدارة المعلومات المحفوظة في أي وقت من إعدادات ملفك الشخصي.'
          }
        </p>
        <div className="flex md:flex-row flex-col justify-between gap-4 py-3">
          <Button
            onClick={() => onNext()}
            intent="ghost"
            className="cursor-pointer bg-[#F3F4F6] text-[#19191A] py-2 rounded-lg text-sm font-medium w-full"
          >
            {
              lang==='en'? 'No, Just Continue' : 'لا، فقط استمر'
            }
          </Button>
          <Button
            onClick={() => handleFormSubmit()}
            disabled={loading}
            loading={loading}
            className="cursor-pointer bg-[#29397E] text-white py-2 rounded-lg text-sm font-medium !w-full"
          >
            {
              lang==='en' ? 'Save & Continue' :'حفظ ومتابعة'
            }
          </Button>
        </div>
      </ModalDialog>
    </>
  )
}

export default UserInfo
