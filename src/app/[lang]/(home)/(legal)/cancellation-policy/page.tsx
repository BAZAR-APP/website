'use client'
import { Button } from '@/components'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="lg:text-[24px] text-lg leading-[32px] font-semibold text-[#19191A] sm:py-3 py-2 sm:mb-1.5">
    {children}
  </h3>
)

const Subsection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="mb-4">
    <h5 className="text-[16px] leading-[24px] font-medium text-[#19191A]">{title}</h5>
    <ul className="list-disc list-inside text-[#484A4C] text-base leading-[19px] font-normal space-y-1 mt-1.5">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
)

const Page = () => {
  const router = useRouter()
  const params = useParams()
  return (
    <div className="lg:px-22 px-12 py-18">
      <Button
        intent="transperent"
        className="!px-0 !py-0"
        onClick={()=> router.back()}
      >
        <ChevronLeft className="w-5 h-5 text-[#9EA0A2]" />
        <span className="text-[#484A4C]">Back</span>
      </Button>

      <h3 className="lg:text-[39px] text-xl leading-[47px] font-semibold text-[#19191A] pt-3.5">
        Cancellation Policy
      </h3>
      <p className="sm:text-[20px] text-sm sm:leading-[24px] leading-5 font-normal text-[#484A4C] sm:py-4 py-2">
        Learn how cancellations work and what to expect based on your booking type.
      </p>

      <div className="bg-[#FFFBEB] rounded-2xl p-4 md:max-w-[520px] max-w-full sm:my-5 my-3">
        <div className="flex items-center gap-3">
          <Image src={'/images/caution.svg'} width={24} height={24} alt="Caution" />
          <h3 className="text-base font-medium leading-6 text-[#19191A]">
            Cancellation and Refund Policy
          </h3>
        </div>
        <p className="text-base font-normal leading-[19px] text-[#484A4C] py-3.5">
          Refunds are available if you choose the refundable option
        </p>
        <p className="text-sm bg-[#FCE7F3] text-[#EC4899] font-medium max-w-[277px] rounded-md px-1.5 py-1">
          Refund Time Estimate Within 72 Hours
        </p>
      </div>

      <SectionTitle>Policy Details</SectionTitle>
      <Subsection
        title="Refundable Bookings"
        items={[
          'Cancellations are allowed up to 72 hours before check-in for a full refund.',
          'Cancellations made within 72 hours of check-in can not be eligible for a refund.',
          'Any applicable refund will be processed within 7 business days.',
        ]}
      />
      <Subsection
        title="Non-Refundable Bookings"
        items={[
          'These bookings are not eligible for refunds under any circumstances.',
          'Please review your selection before confirming your booking.',
        ]}
      />

      <SectionTitle>Additional Notes</SectionTitle>
      <Subsection
        title="Refundable Bookings"
        items={[
          'No-shows or cancellations after the check-in date will not be refunded.',
          'If a deposit was paid, refund eligibility will depend on the condition of the chalet after checkout.',
        ]}
      />
      <h6 className="sm:text-lg text-[15px] sm:leading-7 leading-5 font-semibold text-[#19191A] pt-2">
        For any questions, please contact our support or use the in-app chat.
      </h6>
    </div>
  )
}

export default Page
