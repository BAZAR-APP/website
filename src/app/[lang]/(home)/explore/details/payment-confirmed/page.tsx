import { ChevronRight, CircleDollarSign, Clock, Download, MapPin, PartyPopper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PaymentConfirmationData {
  imageUrl: string
  title: string
  points: number
  details: string
  location: string
  refundInstructions: {
    securityDeposit: string
    method: string
    period: string
  }
}
interface PaymentConfirmedProps {
  bookingConfirmed?: boolean
}
const mockData: PaymentConfirmationData = {
  imageUrl: 'https://picsum.photos/200/300',
  title: 'Luxury Lakeside Retreat',
  points: 200,
  details: '5-7 guests · Entire Home · 5 beds · 4 bath · Wifi · Free Parking',
  location: 'Sea Villa Retreat, Block 5, Street 12, Villa 27, Al Khiran, Ahmadi, Kuwait',
  refundInstructions: {
    securityDeposit: '100 KWD',
    method: 'Same payment method',
    period: '72 hours after checkout',
  },
}

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="text-sm flex self-start leading-4 text-[#8E8E93] py-2">
    <span className="mr-1 text-[#8E8E93]">{icon}</span>
    {text}
  </div>
)

const ActionLink = ({
  icon,
  label,
  href,
  trailingIcon,
}: {
  icon?: React.ReactNode
  label: string
  href: string
  trailingIcon?: React.ReactNode
}) => (
  <Link href={href} className="flex gap-1 items-center">
    {icon}
    <span className="text-sm text-[#29397E] font-medium underline underline-offset-2">{label}</span>
    {trailingIcon}
  </Link>
)

const PaymentConfirmed = () => {
  const data = mockData
  const bookingConfirmed = false
  const refundInfo = [
    {
      icon: <CircleDollarSign className="w-4 h-4" />,
      text: `Refundable Security Deposit: ${data.refundInstructions.securityDeposit}`,
    },
    {
      icon: <PartyPopper className="w-4 h-4" />,
      text: `Refund Method: ${data.refundInstructions.method}`,
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: `Refund Period: ${data.refundInstructions.period}`,
    },
  ]

  const actionLinks = [
    {
      icon: <MapPin className="w-4 h-4 text-[#29397E]" />,
      label: 'View Exact Location',
      href: '',
      trailingIcon: <ChevronRight className="w-3 h-3 text-[#29397E]" strokeWidth={3} />,
    },
    {
      icon: <Image src="/images/ReferIcon.svg" width={16} height={16} alt="Refer" />,
      label: 'Refer A Friend',
      href: '',
      trailingIcon: <Image src="/images/Arrow.svg" width={14} height={14} alt="arrow" />,
    },
    {
      label: 'Download Invoice',
      href: '',
      trailingIcon: <Download className="w-4 h-4 text-[#29397E]" />,
    },
  ]

  return (
    <div className="flex justify-center flex-col items-center md:w-[603px] w-full mx-auto md:px-0 px-6 my-7">
      <Image
        src="/images/PayConfirm.svg"
        width={117}
        height={117}
        alt="Icon"
        className="pb-5 pt-8"
      />
      <h3 className="lg:text-[39px] md:text-3xl sm:text-2xl text-xl font-semibold py-1 leading-[47px] text-[#19191A] text-center md:pt-6 pt-3 w-full">
        Payment Confirmed
      </h3>
      <p className="lg:text-[20px] md:text-[16px] text-sm md:leading-[28px] lg:leading-[34px] leading-5 py-1 text-[#484A4C] text-center">
        {bookingConfirmed ? (
          'Your booking is complete. Thank you for choosing us!'
        ) : (
          <>
            <p> Your booking is complete. Thank you for choosing us!</p>
            You earned {data.points} points. Track and redeem them in your profile anytime!
          </>
        )}
      </p>
      <div className="w-full max-w-[540px]">
        <Image
          src={data.imageUrl}
          alt={data.title}
          width={200}
          height={200}
          className="w-full mt-5 object-cover rounded-[24px] sm:h-[326px] h-[270px]"
        />

        <div className="self-start pt-4">
          <div className="flex items-center flex-wrap gap-3 mb-3">
            <h3 className="text-[16px] leading-[24px] font-medium text-[#19191A] font-inter">
              {data.title}
            </h3>
            <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[108px]">
              <Image src="/images/Points.svg" width={16} height={16} alt="Points-Icon" />
              <span className="text-[#29397E] text-sm">{data.points} Points</span>
            </div>
          </div>
        </div>

        <p className="text-sm leading-4 font-normal text-[#8E8E93] self-start">{data.details}</p>

        <div className="text-sm flex gap-2 self-start my-4.5 leading-4 text-[#8E8E93]">
          <MapPin className="w-4 h-4 text-[#8E8E93]" />
          <span className="pr-2">{data.location}</span>
        </div>

        <h4 className="self-start text-[12px] leading-4 font-semibold text-[#121722]">
          Refund Instructions
        </h4>

        {refundInfo.map((item, i) => (
          <InfoItem key={i} icon={item.icon} text={item.text} />
        ))}

        <div className="self-start py-3 flex gap-2 flex-wrap">
          {actionLinks.map((link, i) => (
            <ActionLink
              key={i}
              icon={link.icon}
              label={link.label}
              href={link.href}
              trailingIcon={link.trailingIcon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmed
