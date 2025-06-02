import React, { useState } from 'react'
import CommonInput from './CommonInput/Input'

interface ContactFormData {
  fullName: string
  phone: string
  email: string
  address: string
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:w-[330px] w-full">
        <CommonInput
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder=""
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
        />
        <CommonInput
          icon={<img src={'/images/countryFlag.svg'} alt="" className="w-[16px] h-[16px]" />}
          prefix="+965"
          name="phone"
          placeholder=""
          type="tel"
          label="Phone"
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />

        <CommonInput
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'}
          placeholder=""
        />

        <CommonInput
          label="Home or IP Address"
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
