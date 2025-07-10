import React, { useEffect, useState } from 'react'
import CommonInput from './CommonInput/Input'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

interface ContactFormData {
  fullName: string
  phone: string
  email: string
  address: string
}

interface ContactFormProps {
  onChange: (field: keyof ContactFormData, value: string) => void
  formData: ContactFormData
}

const ContactForm: React.FC<ContactFormProps> = ({ onChange, formData }) => {
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
          label="Full Name"
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
          label="Phone"
          value={formData?.email}
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
