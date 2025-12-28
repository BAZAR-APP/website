'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChevronRight, CircleDollarSign, Clock, Download, MapPin, PartyPopper } from 'lucide-react'
import toast from 'react-hot-toast'
import { extractErrorMessage, calculateLoyaltyPoints, calculateSplitPayment } from '@/lib/utils'
import { Chalet } from '../../../../../../../../types/chalets'
import { SocialLinkShare } from '@/components'
import { useUserStore } from '../../../../../../../../stores/useUserStore'
import { useBookingStore } from '../../../../../../../../stores/useBookingStore'
import { generateInvoicePDF, InvoiceData } from '@/lib/generateInvoicePDF'
import { format } from 'date-fns'
import api, { useQueryBase } from '@/lib/axios'
import { IBooking } from '@/lib/types/booking'

const PaymentConfirmed = () => {
  const bookingConfirmed = false
  const { data: session } = useSession()
  const { id, lang } = useParams() as { id: string; lang: 'en' | 'ar' }
  const [data, setData] = useState<Chalet | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [invoiceGenerated, setInvoiceGenerated] = useState(false)
  const bookingStore = useBookingStore();
  const userStore = useUserStore();

  // Fetch user's current bookings to get the latest booking for this chalet
  // Note: id here is the chalet ID, not booking ID
  const { data: bookingData } = useQueryBase({
    queryKey: ['userBookings', 'current', lang],
    url: `/booking/me?type=current&language=${lang}`,
    staleTime: 0,
    cacheTime: 0,
    enabled: !!session?.user?.accessToken && !!lang,
  })

  // Get the most recent booking for this chalet from user's bookings
  const bookings = bookingData?.data?.bookings as IBooking[] | undefined
  const bookingDetails = bookings && Array.isArray(bookings) && bookings.length > 0
    ? bookings
      .filter((b) => b.chaletId === id)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0]
    : undefined

  const handleDownloadInvoice = async () => {
    try {
      if (!data) {
        console.error("❌ Chalet data is missing!");
        toast.error("Chalet data not loaded.");
        return;
      }

      // Use booking ID from bookingDetails if available, otherwise use a generated ID
      const actualBookingId = bookingDetails?.id || `temp-${id}-${Date.now()}`;
      if (!actualBookingId) {
        toast.error(lang === 'en' ? "Invalid Booking ID." : "معرف الحجز غير صالح.");
        return;
      }

      // Calculate amounts based on payment status
      const grandTotal = bookingDetails?.grandTotal || Number(bookingStore.packageAmount) || 0
      const isHalfPaid = bookingDetails?.paymentStatus === 'halfPaid'
      let paidAmount = grandTotal
      let remainingAmount = 0

      if (isHalfPaid) {
        const split = calculateSplitPayment(grandTotal)
        paidAmount = split.firstPayment
        remainingAmount = split.secondPayment
      }

      const fullLocation = `${data.street1 || ''}, ${data.street2 || ''}, ${data.city || ''}, ${data.state || ''}, ${data.country || ''}`.replace(/^[ ,]+|[ ,]+$/g, '')

      const invoiceData: InvoiceData = {
        invoiceNo: actualBookingId,
        issuedOn: format(new Date(bookingDetails?.createdAt || Date.now()), 'dd/MM/yyyy'),
        dueOn: format(new Date(bookingDetails?.startDate || bookingStore.selectedDates.checkIn), 'dd/MM/yyyy'),
        guestName: userStore.user?.name || 'Guest Name',
        guestEmail: userStore.user?.email || 'guest@example.com',
        guestPhone: userStore.user?.phone || '+96512341234',
        address: 'Kuwait',
        chaletTitle: data.title || 'N/A',
        chaletImage: data.photoURL || '',
        chaletAddress: fullLocation,
        startDate: format(new Date(bookingDetails?.startDate || bookingStore.selectedDates.checkIn), 'dd MMM yyyy'),
        endDate: format(new Date(bookingDetails?.endDate || bookingStore.selectedDates.checkOut), 'dd MMM yyyy'),
        startTime: format(new Date(bookingDetails?.startDate || bookingStore.selectedDates.checkIn), 'hh:mm a'),
        endTime: format(new Date(bookingDetails?.endDate || bookingStore.selectedDates.checkOut), 'hh:mm a'),
        guests: bookingDetails?.noOfGuests || 1,
        location: data.city || 'N/A',
        items: [
          { label: lang === 'en' ? 'Booking Amount' : 'مبلغ الحجز', amount: grandTotal },
          { label: lang === 'en' ? 'Refundable Security Deposit' : 'تأمين قابل للاسترداد', amount: 200 }
        ],
        customization: [], // Add customizations if available in store/details
        totalAmount: grandTotal + 200,
        paymentStatus: isHalfPaid ? 'half' : 'paid',
        paidAmount: paidAmount,
        noOfNights: bookingStore.noOfNights || 0,
        perNightCost: Number(bookingStore.packageAmount) / (bookingStore.noOfNights || 1),
        refundableDepositAmount: 200
      };

      console.log('Invoice Data:', invoiceData);

      await generateInvoicePDF(invoiceData, lang);
      toast.success(lang === 'en' ? 'Invoice downloaded successfully!' : 'تم تنزيل الفاتورة بنجاح!');
    } catch (error) {
      console.error('Error downloading invoice:', error);
      toast.error(lang === 'en' ? 'Failed to download invoice.' : 'فشل تنزيل الفاتورة.');
    }
  };

  // Auto-generate invoice for half-paid bookings
  useEffect(() => {
    if (bookingDetails && data && !invoiceGenerated && bookingDetails.paymentStatus === 'halfPaid') {
      const generateInvoice = async () => {
        try {
          const grandTotal = bookingDetails.grandTotal || 0
          const split = calculateSplitPayment(grandTotal)
          const paidAmount = split.firstPayment
          const remainingAmount = split.secondPayment

          const fullLocation = `${data.street1 || ''}, ${data.street2 || ''}, ${data.city || ''}, ${data.state || ''}, ${data.country || ''}`.replace(/^[ ,]+|[ ,]+$/g, '')

          const invoiceData: InvoiceData = {
            invoiceNo: bookingDetails.id,
            issuedOn: format(new Date(bookingDetails.createdAt || Date.now()), 'dd/MM/yyyy'),
            dueOn: format(new Date(bookingDetails.startDate), 'dd/MM/yyyy'),
            guestName: userStore.user?.name || 'Guest Name',
            guestEmail: userStore.user?.email || 'guest@example.com',
            guestPhone: userStore.user?.phone || '+96512341234',
            address: 'Kuwait',
            chaletTitle: data.title || 'N/A',
            chaletImage: data.photoURL || '',
            chaletAddress: fullLocation,
            startDate: format(new Date(bookingDetails.startDate), 'dd MMM yyyy'),
            endDate: format(new Date(bookingDetails.endDate), 'dd MMM yyyy'),
            startTime: format(new Date(bookingDetails.startDate), 'hh:mm a'),
            endTime: format(new Date(bookingDetails.endDate), 'hh:mm a'),
            guests: bookingDetails.noOfGuests,
            location: data.city || 'N/A',
            items: [
              { label: lang === 'en' ? 'Booking Amount' : 'مبلغ الحجز', amount: grandTotal },
              { label: lang === 'en' ? 'Refundable Security Deposit' : 'تأمين قابل للاسترداد', amount: 200 }
            ],
            customization: [],
            totalAmount: grandTotal + 200,
            paymentStatus: 'half',
            paidAmount: paidAmount,
            noOfNights: bookingDetails.noOfNights || 0,
            perNightCost: (bookingDetails as any).perNightCost || (bookingDetails.grandTotal / (bookingDetails.noOfNights || 1)),
            refundableDepositAmount: 200
          };

          await generateInvoicePDF(invoiceData, lang);
          setInvoiceGenerated(true);
        } catch (error) {
          console.error('Error auto-generating invoice:', error);
          // Don't show error toast for auto-generation, just log it
        }
      };

      generateInvoice();
    }
  }, [bookingDetails, data, invoiceGenerated, lang, userStore.user, id]);

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

  // Calculate nights from dates if not available in store
  const calculateNightsFromDates = () => {
    if (bookingStore.selectedDates?.checkIn && bookingStore.selectedDates?.checkOut) {
      const checkIn = new Date(bookingStore.selectedDates.checkIn)
      const checkOut = new Date(bookingStore.selectedDates.checkOut)
      // Reset time to midnight to avoid time component issues
      checkIn.setHours(0, 0, 0, 0)
      checkOut.setHours(0, 0, 0, 0)
      const diffTime = checkOut.getTime() - checkIn.getTime()
      // Use Math.floor to get exact number of nights (not Math.ceil which adds extra night)
      return Math.floor(diffTime / (1000 * 3600 * 24))
    }
    return bookingStore.noOfNights ?? 0
  }

  const numberOfNights = calculateNightsFromDates()
  const points = calculateLoyaltyPoints(data?.noOfLoyalityPoints, numberOfNights, bookingStore.bookingType === 'hourly')

  // Only show points if booking is fully paid
  const isFullyPaid = bookingDetails?.paymentStatus === 'fullPaid'
  const shouldShowPoints = isFullyPaid

  const fullLocation = `${data.street1}, ${data.street2}, ${data.city}, ${data.state}, ${data.country}`
  const details = `${data.maxNoOfGuests || 'N/A'} guests · ${data.isEntireHomeAvailabe ? 'Entire Home' : 'Private Room'
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
          {lang === 'en' ? 'Payment Confirmed' : 'تم تأكيد الدفع'}
        </h3>

        <div className="lg:text-[20px] md:text-[16px] text-sm md:leading-[28px] lg:leading-[34px] leading-5 py-1 text-[#484A4C] text-center">
          {bookingConfirmed ? (
            'Your booking is complete. Thank you for choosing us!'
          ) : (
            <>
              <p>
                {lang === 'en'
                  ? 'Your booking is complete. Thank you for choosing us!'
                  : 'تم اكتمال حجزك. شكرًا لاختيارك لنا!'}
              </p>
              {shouldShowPoints && (
                <p>
                  {lang === 'en'
                    ? `You earned ${points} points. Track and redeem them in your profile anytime!`
                    : `لقد حصلت على ${points} نقطة. يمكنك تتبعها واستردادها في ملفك الشخصي في أي وقت!`}
                </p>
              )}
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
              {shouldShowPoints && (
                <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[108px]">
                  <Image src="/images/Points.svg" width={16} height={16} alt="Points-Icon" />
                  <span className="text-[#29397E] text-sm">{points} Points</span>
                </div>
              )}
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
            <button
              onClick={() => {
                if (data?.latitude && data?.longitude) {
                  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`
                  window.open(googleMapsUrl, '_blank')
                }
              }}
              className="flex gap-1 items-center cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#29397E]" />
              <span className="text-sm text-[#29397E] font-medium underline underline-offset-2">
                View Exact Location
              </span>
              <ChevronRight className="w-3 h-3 text-[#29397E]" strokeWidth={3} />
            </button>

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
            <button
              onClick={handleDownloadInvoice}
              className="flex gap-1 items-center cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#29397E]" />
              <span className="text-sm text-[#29397E] font-medium underline underline-offset-2">
                Download Invoice
              </span>
            </button>
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
