'use client'
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChevronRight, CircleDollarSign, Clock, Download, MapPin, PartyPopper } from 'lucide-react'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/lib/utils'
import { Chalet } from '../../../../../../../../types/chalets'
import { SocialLinkShare, SocialShareWrapper } from '@/components'

const PaymentConfirmed = () => {
  const bookingConfirmed = false
  const { data: session } = useSession()
  const { id, lang } = useParams() as { id: string; lang: 'en' | 'ar' }
  const [data, setData] = useState<Chalet | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!id || !lang) return
    const fetchChaletData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/chalets/readById/${id}?language=${lang}`,
          {
            method: 'GET',
            headers: {
              ...(session?.user?.accessToken && {
                Authorization: `Bearer ${session.user.accessToken}`,
              }),
            },
          },
        )
        const json = await res.json()
        setData(json)
      } catch (err) {
        toast.error(extractErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchChaletData()
  }, [id, lang, session?.user?.accessToken])

  if (loading || !data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const points = data.noOfLoyalityPoints || 0
  const fullLocation = `${data.street1}, ${data.street2}, ${data.city}, ${data.state}, ${data.country}`
  const details = `${data.maxNoOfGuests || 'N/A'} guests · ${
    data.isEntireHomeAvailabe ? 'Entire Home' : 'Private Room'
  } · ${data.maxNoOfBeds} beds · ${data.noOfBaths} bath`

  return (
    <>
      <SocialLinkShare
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Refers A Friend"
        colRevers={true}
      >
        <div className="bg-[#F9FAFB] w-[161px] h-[161px] mx-auto rounded-[20px] flex justify-center items-center">
          <Image src={'/images/gift.svg'} alt="gift" width={119} height={119} />
        </div>
      </SocialLinkShare>
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

        <div className="lg:text-[20px] md:text-[16px] text-sm md:leading-[28px] lg:leading-[34px] leading-5 py-1 text-[#484A4C] text-center">
          {bookingConfirmed ? (
            'Your booking is complete. Thank you for choosing us!'
          ) : (
            <>
              <p> Your booking is complete. Thank you for choosing us!</p>
              You earned {points} points. Track and redeem them in your profile anytime!
            </>
          )}
        </div>

        <div className="w-full max-w-[540px]">
          <Image
            src={data.photoURL}
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
                <span className="text-[#29397E] text-sm">{points} Points</span>
              </div>
            </div>
          </div>

          <div className="text-sm leading-4 font-normal text-[#8E8E93] self-start">
            <span>{details}</span>
            {data.amenities?.length > 0 && (
              <span className="flex flex-wrap gap-2 mt-2 w-full">
                {data.amenities.map((amenity) => (
                  <span
                    key={amenity.id}
                    className="flex items-center gap-1 text-[#8E8E93] text-sm font-normal"
                  >
                    {amenity.title}
                  </span>
                ))}
              </span>
            )}
          </div>
          <div className="text-sm flex gap-2 self-start my-2 mb-3 leading-4 text-[#8E8E93]">
            <MapPin className="w-4 h-4 text-[#8E8E93]" />
            <span className="pr-2">{fullLocation}</span>
          </div>

          <h4 className="self-start text-[12px] leading-4 font-semibold text-[#121722]">
            Refund Instructions
          </h4>
          <InfoItem
            icon={<CircleDollarSign className="w-4 h-4" />}
            text="Refundable Security Deposit: 200 KWD"
          />
          <InfoItem
            icon={<PartyPopper className="w-4 h-4" />}
            text="Refund Method: Same payment method"
          />
          <InfoItem
            icon={<Clock className="w-4 h-4" />}
            text="Refund Period: 72 hours after checkout"
          />

          <div className="self-start py-3 flex gap-2 flex-wrap">
            <ActionLink
              icon={<MapPin className="w-4 h-4 text-[#29397E]" />}
              label="View Exact Location"
              href=""
              trailingIcon={<ChevronRight className="w-3 h-3 text-[#29397E]" strokeWidth={3} />}
            />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex gap-1 items-center cursor-pointer"
            >
              <Image src="/images/ReferIcon.svg" width={16} height={16} alt="Refer" />{' '}
              <span className="text-sm text-[#29397E] font-medium underline underline-offset-2">
                Refer A Friend
              </span>
              <ChevronRight className="w-3 h-3 text-[#29397E]" strokeWidth={3} />{' '}
            </button>
            <ActionLink
              label="Download Invoice"
              href=""
              trailingIcon={<Download className="w-4 h-4 text-[#29397E]" />}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentConfirmed

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
