import CommonInput from './CommonInput/Input'
import Image from 'next/image'
import { Locale } from '../../i18n.config'

interface ContactFormData {
  fullName: string
  phone: string
  email: string
  address: string
}

interface ContactFormProps {
  onChange: (field: keyof ContactFormData, value: string) => void
  formData: ContactFormData
  lang: Locale
}

const ContactForm: React.FC<ContactFormProps> = ({ onChange, formData, lang }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    onChange(field, value)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:w-[330px] w-full">
        <CommonInput
          label= {lang==='en'? 'Full Name' : 'الاسم الكامل'}
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder=""
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
        />
        <CommonInput
          icon={
            <Image
              src={'/images/countryFlag.svg'}
              alt=""
              className="w-[24px] h-[22px]"
              width={30}
              height={30}
            />
          }
          prefix="+965"
          name="phone"
          placeholder=""
          type="tel"
          label={lang==='en'? 'Phone' : 'هاتف'}
          value={formData?.phone}
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />

        <CommonInput
          label={lang==='en'? 'E-mail' : 'بريد إلكتروني'}
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
          placeholder=""
        />

        <CommonInput
          label={lang==='en'? 'Home or IP Address' : 'عنوان المنزل أو IP'}
          name="address"
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
          placeholder=""
        />
      </form>
    </>
  )
}

export default ContactForm
