'use client'

import React, { useMemo, useCallback, useState } from 'react'
import { MapPin, ChevronRight, ShieldOff, Download } from 'lucide-react'
import { Button } from '@/components'
import ChaletRules from '@/components/ChaletsRules'
import Image from 'next/image'
import Location from '@/components/Location'
import { useParams, useRouter } from 'next/navigation'
import CancelBooking from '@/components/Booking/CancelBooking'
import useToggle from '@/lib/hooks/useToggle'
import ModalDialog from '@/components/ModalDialog/Dialog'
import api, { useQueryBase } from '@/lib/axios'
import { IBooking } from '@/lib/types/booking'
import { format } from 'date-fns'
import { extractErrorMessage, calculateLoyaltyPoints, calculateSplitPayment } from '@/lib/utils'
import { toast } from '@/lib/toast'
import { Locale } from '../../../../../../i18n.config'
import { useBookingStore } from '../../../../../../stores/useBookingStore'
import { generateBookingInvoicePDF } from '@/lib/generateInvoicePDF'
import { useUserStore } from '../../../../../../stores/useUserStore'

interface AddOn {
  name: string
  price: number
  icon?: string
  selectedDate?: string
}

interface PriceBreakdownItem {
  description: string
  amount: number
}

interface DateRange {
  from: string
  to: string
}

type PaymentStatus = 'fullPaid' | 'halfPaid'
type bookingStatus = 'pending' | 'confirmed' | 'cancelled' | string

const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = React.memo(
  function PaymentStatusBadge({ status }) {
    const statusConfig = {
      fullPaid: {
        bgColor: 'bg-[#D1FAE5]',
        textColor: 'text-[#10B981]',
        icon: '/images/paid.svg',
        text: 'Fully Paid',
      },
      halfPaid: {
        bgColor: 'bg-[#FCE7F3]',
        textColor: 'text-[#EC4899]',
        icon: '/images/discount.svg',
        text: '50% Paid',
      },
    }

    const config = statusConfig[status] || statusConfig.fullPaid

    return (
      <div
        className={`flex ${config.bgColor} ${config.textColor} rounded-md px-1.5 py-1 text-sm gap-0.5`}
      >
        <Image src={config.icon} width={20} height={20} alt="Payment status icon" />
        {config.text}
      </div>
    )
  },
)

const PropertyInfo: React.FC<{
  guests: string
  propertyType: string
  beds: number
  baths: number
  amenities: string[]
}> = React.memo(function PropertyInfo({ guests, propertyType, beds, baths, amenities }) {
  const infoItems = useMemo(
    () => [
      `${guests} guest${Number(guests) > 1 ? 's' : ''}`,
      propertyType,
      `${beds} bed${beds > 1 ? 's' : ''}`,
      `${baths} bath${baths > 1 ? 's' : ''}`,
      ...amenities,
    ],
    [guests, propertyType, beds, baths, amenities],
  )
  return (
    <div className="text-sm text-[#8E8E93] leading-5">
      {infoItems.map((item, index) => (
        <span key={item}>
          {item}
          {index < infoItems.length - 1 && (
            <span className="text-[#9EA0A2] text-[9px] px-1">&bull;</span>
          )}
        </span>
      ))}
    </div>
  )
})

const DateSection: React.FC<{ dateRange: DateRange }> = React.memo(function DateSection({
  dateRange,
}) {
  return (
    <div className="border-b border-[#D1D5DB] max-w-[359px]">
      <h2 className="font-semibold text-[25px] leading-[32px] text-[#19191A] mb-4">Dates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="sm:border-r border-[#D1D5DB] px-0.5">
          <label className="font-semibold text-[10px] leading-[16px] text-[#19191A]">
            CHECK-IN
          </label>
          <div className="text-[14px] leading-[17px] text-[#9EA0A2]">
            {dateRange?.from ? format(new Date(dateRange.from), 'dd/MM/yyyy') : 'Not set'}
          </div>
        </div>
        <div className="px-0.5">
          <label className="font-semibold text-[10px] leading-[16px] text-[#19191A]">
            CHECKOUT
          </label>
          <div className="text-[14px] leading-[17px] text-[#9EA0A2]">
            {dateRange?.to ? format(new Date(dateRange.to), 'dd/MM/yyyy') : 'Not set'}
          </div>
        </div>
      </div>
    </div>
  )
})

const AddOnsSection: React.FC<{ addOns: AddOn[] }> = React.memo(function AddOnsSection({ addOns }) {
  if (!addOns?.length) return null

  return (
    <div>
      <h2 className="font-semibold text-[25px] leading-8 text-[#19191A] mb-4">Add-ons</h2>
      {addOns.map((addOn, index) => (
        // ✅ Wrap both divs in a single parent div with a key
        <div key={`${addOn.name}-${index}`} className="flex flex-col"> 
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <Image src={addOn.icon || '/images/Addon.svg'} width={16} height={16} alt="Add icon" />
            <span className="text-base leading-[19px] text-[#19191A]">{addOn.name}</span>
            <span className="text-base leading-[19px] text-[#19191A]">{addOn.price} KWD</span>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-1 pl-6"> {/* Added pl-6 or similar to indent if needed */}
            <span>{addOn.selectedDate ? new Date(addOn.selectedDate).toLocaleDateString('en-GB') : 'Not set'}</span>
          </div>
        </div>
      ))}
    </div>
  )
})

const PaymentSection: React.FC<{
  paymentStatus: PaymentStatus
  totalAmount: number
  securityDeposit: number
  paymentDueDate: string
  priceBreakdown: PriceBreakdownItem[]
  bookingStatus: bookingStatus
  onPayRemaining?: () => void
  onCancelBooking?: () => void
  onRefundFullAmount?: () => void
  onDownloadInvoice?: () => void
  lang: Locale
  isRefunded?: boolean
  isPaying?: boolean
}> = React.memo(function PaymentSection({
  paymentStatus,
  totalAmount,
  securityDeposit,
  paymentDueDate,
  priceBreakdown,
  bookingStatus,
  onPayRemaining,
  onCancelBooking,
  onRefundFullAmount,
  onDownloadInvoice,
  lang,
  isRefunded = false,
  isPaying = false,
}) {
  return (
    <div className="w-full lg:max-w-[430px] max-w-full">
      <div className="sm:px-6 px-3 bg-[#F9FAFB] rounded-[16px] py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold md:text-[25px] text-lg md:leading-8 leading-6 text-[#19191A]">
           { lang === 'en' ? 'Total Payments' : 'إجمالي المدفوعات' } 
          </h2>
          <PaymentStatusBadge status={paymentStatus} />
        </div>

        {paymentStatus === 'halfPaid' && (
          <p className="text-sm leading-[17px] text-[#9EA0A2]">
            {(() => {
              const split = calculateSplitPayment(totalAmount)
              return `You've paid 50% of the total amount (${totalAmount} KWD). The remaining ${split.secondPayment} KWD is due at least 72 hours before check-in by [${paymentDueDate}].`
            })()}
          </p>
        )}

        {securityDeposit > 0 && (
          <div className="bg-[#FCE7F3] rounded-lg py-1 px-2 my-4">
            <p className="text-[10px] text-[#EC4899] leading-relaxed">
                {
                    lang === 'en' ? ` A refundable security deposit of ${securityDeposit} KWD is required. This amount will
              be held and returned within 72 hours after checkout if no damage is reported.` : `يُطلب وديعة تأمين قابلة للاسترداد بقيمة ${securityDeposit} دينار كويتي. سيتم الاحتفاظ بهذا المبلغ وإرجاعه خلال 72 ساعة من تاريخ المغادرة في حال عدم الإبلاغ عن أي ضرر.`
                }
             
            </p>
          </div>
        )}

        <div className="space-y-4 mb-6 text-base leading-[19px] text-[#19191A]">
          {priceBreakdown.map((item, index) => (
            <div key={`${item.description}-${index}`} className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                {item.description}
                {(item.description === 'Refundable Deposit' || item.description === 'الوديعة القابلة للاسترداد') && (
                  <Image src="/images/Deposit.svg" width={15} height={15} alt="Deposit icon" />
                )}
              </span>
              <span>{item.amount} {lang === 'en' ? 'KWD' : 'دينار كويتي'}</span>
            </div>
          ))}

          <hr />
          <div className="flex justify-between items-center font-medium text-[#19191A] text-[16px]">
            <span> {lang === 'en' ? 'Total' : 'المجموع'} </span>
            <span>
              {priceBreakdown.reduce((sum, item) => sum + (item.amount || 0), 0)} {lang === 'en' ? 'KWD' : 'دينار كويتي'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 min-h-[200px] pt-10">
        {onDownloadInvoice && (
          <Button
            intent="transperent"
            className="w-full !text-sm !border !border-[#29397E] !text-[#29397E]"
            onClick={onDownloadInvoice}
          >
            {lang === 'en' ? 'Download Invoice' : 'تنزيل الفاتورة'}
          </Button>
        )}
        {paymentStatus === 'halfPaid' && (
          <Button
            intent="primary"
            className="w-full !px-0 !text-sm !text-[#FFFFFF]"
            onClick={onPayRemaining}
            disabled={isPaying}
          >
            {(() => {
              const split = calculateSplitPayment(totalAmount)
              return isPaying 
                ? (lang === 'en' ? 'Processing...' : 'جاري المعالجة...')
                : `${lang === 'en' ? 'Pay Remaining Amount' : 'دفع المبلغ المتبقي'} ${split.secondPayment} KD Now`
            })()}
          </Button>
        )}
        {paymentStatus !== 'fullPaid' && (
          <Button
            intent="primary"
            className="w-full !text-sm"
            onClick={onRefundFullAmount}
            disabled={bookingStatus === 'cancelled' || isRefunded}
          >
            {isRefunded
              ? lang === 'en'
                ? 'This booking refunded'
                : 'تم استرداد هذا الحجز'
              : lang === 'en'
              ? 'Cancel and refund amount'
              : 'إلغاء الحجز واسترداد المبلغ'}
          </Button>
        )}
        {!isRefunded && paymentStatus !== 'fullPaid' && (
          <Button
            intent="danger"
            className="w-full !text-sm"
            onClick={onCancelBooking}
            disabled={bookingStatus === 'cancelled'}
          >
            {bookingStatus === 'cancelled'
              ? lang === 'en'
                  ? 'Booking Cancelled'
                  : 'تم إلغاء الحجز'
              : lang === 'en'
                  ? 'Cancel Booking'
                  : 'إلغاء الحجز'}
          </Button>
        )}
      </div>
    </div>
  )
})

interface BookingDetailMessages {
  common: { 
    chalet_rules: { 
      title: string;
      check_in_out: {
        check_in_label: string;
        check_out_label: string;
        check_in_time: string;
        checkout_time: string;
      };
      health_standards: Array<{ id: string; title: string }>;
      chalet_standards: Array<{ id: string; title: string }>;
      cancellation_policy: {
        title: string;
        description: string;
        refund_time_estimate: string;
        show_more_button: string;
      };
    };
    // Add other specific keys from common.json if ProfileBilling or other components in this page use them directly
    // For example, if ProfileBilling used messages.common.someOtherKey:
    // someOtherKey: string;
  };
  banner: Record<string, unknown>; // Use Record for sections not used here
  searchHeader: Record<string, unknown>;
  luxuryExperience: Record<string, unknown>;
  whyBookSection: Record<string, unknown>;
  destinationSection: Record<string, unknown>;
  chaletsCard: Record<string, unknown>;
  rewardsSection: Record<string, unknown>;
  chatHero: Record<string, unknown>;
  downloadApp: Record<string, unknown>;
  footer: Record<string, unknown>;
  filter: Record<string, unknown>;
  profile: {
    chalet_rules: {
      title: string;
      check_in_out: {
        check_in_label: string;
        check_out_label: string;
        check_in_time: string;
        checkout_time: string;
      };
      health_standards: Array<{ id: string; title: string }>;
      chalet_standards: Array<{ id: string; title: string }>;
      cancellation_policy: {
        title: string;
        description: string;
        refund_time_estimate: string;
        show_more_button: string;
      };
    };
  };
  // Add other sections if needed by this page
}
interface BookingDetailsPageClientProps {
  lang: Locale;
  messages: BookingDetailMessages; // Accept the messages object
}


export const BookingDetailsPageClient: React.FC<BookingDetailsPageClientProps> = ({ lang, messages }) => {
  const router = useRouter()
  const { id } = useParams() as { id: string, lang:Locale }
  const { isOpen, toggle } = useToggle()
  const [isCancelling, setIsCancelling] = useState<boolean>(false)
  const [isPaying, setIsPaying] = useState<boolean>(false)
  const { data, isLoading, refetch } = useQueryBase({
    queryKey: ['bookingDetails', id, lang],
    url: `/booking/readById/${id}?language=${lang}`,
    staleTime: 0,
    cacheTime: 0,
    enabled: !!id && !!lang,
  })

  const bookingDetails = data?.data as IBooking

  // Get refund status from booking store
  const { addRefundedBooking, refundedBookings } = useBookingStore()
  const userStore = useUserStore()
  
  const isRefunded = useMemo(() => {
    if (refundedBookings.includes(id)) {
      return true
    }

    if (bookingDetails) {
      const hasRefunds = (bookingDetails as any)?.refunds?.length > 0 || 
                        (bookingDetails as any)?.paymentRefunds?.length > 0
      if (hasRefunds) {
        return true
      }
    }

    return false
  }, [id, bookingDetails, refundedBookings])
  const addOns = useMemo(() => {
    return (
      bookingDetails?.bookingCustomizations?.map((item:any) => ({
        name: item.chaletCustomization?.customization?.title ?? 'Unnamed Add-On',
        price: item.totalCost ?? 0,
        icon: item.chaletCustomization?.customization?.iconPhotoUrl ?? '',
        selectedDate: item?.selectedDate
      })) ?? []
    )
  }, [bookingDetails])

  const priceBreakdown = useMemo(() => {
    if (!bookingDetails) return []
    
    const breakdown: PriceBreakdownItem[] = []
    
    // Calculate components that make up grandTotal
    // grandTotal = addonsTotal + packageAmount + romanticWeekend(25) + cancellationFee
    // where packageAmount = baseCost + deposit (200)
    
    // Individual add-ons (each one separately, matching BookingSummary)
    const addonsTotal = bookingDetails.bookingCustomizations?.reduce(
      (sum: number, item: any) => sum + (item.totalCost || 0),
      0
    ) || 0
    
    bookingDetails.bookingCustomizations?.forEach((item: any) => {
      const addonCost = item.totalCost || 0
      if (addonCost > 0) {
        const addonTitle = item.chaletCustomization?.customization?.title || 
                          item.customization?.title || 
                          'Unnamed Add-On'
        breakdown.push({
          description: addonTitle,
          amount: addonCost,
        })
      }
    })
    
    // Romantic Weekend (if applicable) - 25 KWD
    const isRomanticBooking = (bookingDetails as any)?.isRomanticBookingSelected || false
    if (isRomanticBooking) {
      breakdown.push({
        description: lang === 'en' ? 'Romantic Weekend' : 'عطلة نهاية الأسبوع الرومانسية',
        amount: 25,
      })
    }
    
    // Package Amount Breakdown (matching BookingSummary structure)
    // In BookingSummary: grandTotal = addonsTotal + packageAmount + romanticWeekend(25) + cancellationFee
    // packageAmount = baseCost + deposit (200)
    // Package Price = packageAmount - 200 = baseCost
    const deposit = bookingDetails.refundableDepositAmount || 200
    const cancellationFee = bookingDetails.chalet?.additionFeeForFullRefund || 0
    const romanticWeekendAmount = isRomanticBooking ? 25 : 0
    
    // Calculate what packageAmount would be
    // packageAmount = grandTotal - addonsTotal - romanticWeekend - cancellationFee
    const calculatedPackageAmount = bookingDetails.grandTotal - addonsTotal - romanticWeekendAmount - cancellationFee
    
    // Package Price = packageAmount - deposit (matching BookingSummary: packageAmount - 200)
    const packagePrice = Math.max(0, calculatedPackageAmount - deposit)
    
    // Show Package Price (matching BookingSummary structure)
    if (calculatedPackageAmount > 0) {
      breakdown.push({
        description: lang === 'en' ? 'Package Price' : 'مبلغ الحزمة',
        amount: packagePrice,
      })
      
      // Refundable Deposit (200) - shown in breakdown
      if (deposit > 0) {
        breakdown.push({
          description: lang === 'en' ? 'Refundable Deposit' : 'الوديعة القابلة للاسترداد',
          amount: deposit,
        })
      }
      
      // Cancelation fee - added separately to grandTotal
      if (cancellationFee > 0) {
        breakdown.push({
          description: lang === 'en' ? 'Cancelation fee' : 'رسوم الإلغاء',
          amount: cancellationFee,
        })
      }
    } else {
      // If no package amount, show Package Amount as 0 (matching BookingSummary fallback)
      breakdown.push({
        description: lang === 'en' ? 'Package Amount' : 'مبلغ الحزمة',
        amount: 0,
      })
    }
    
    return breakdown
  }, [bookingDetails, lang])

  const { isOpen: isCancelOpen, toggle: toggleCancel } = useToggle(false)
  const { isOpen: isConfirmCancel, toggle: confirmCancelToggle } = useToggle(false)

  const refundAmount = useMemo(() => {
    if (!bookingDetails) return 0
    
    const securityDeposit = bookingDetails.refundableDepositAmount || 200
    let paidAmount = 0
    
    if (bookingDetails.paymentStatus === 'halfPaid') {
      // User paid 50% of grandTotal
      paidAmount = bookingDetails.grandTotal / 2
    } else if (bookingDetails.paymentStatus === 'fullPaid') {
      // User paid 100% of grandTotal
      paidAmount = bookingDetails.grandTotal
    }
    
    // Refund includes the paid amount plus the security deposit (if applicable)
    return paidAmount + securityDeposit
  }, [bookingDetails])

  const handleViewDetails = useCallback(() => {
    if (!bookingDetails?.chalet?.isDeleted) return toggle()
    router.push(`/chalet/${bookingDetails?.chalet?.id || 'some-default-chalet-id'}`)
  }, [router, bookingDetails?.chalet?.id])

  const handleViewLocation = useCallback(() => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${bookingDetails?.chalet?.latitude},${bookingDetails?.chalet?.longitude}`
    window.open(googleMapsUrl, '_blank')
  }, [])

  const handlePayRemaining = async () => {
    try {
      if (!bookingDetails) {
        toast.error(lang === 'en' ? 'Booking details not available' : 'تفاصيل الحجز غير متاحة')
        return
      }

      const split = calculateSplitPayment(bookingDetails.grandTotal)
      const remainingAmount = split.secondPayment
      
      if (remainingAmount <= 0) {
        toast.error(lang === 'en' ? 'Invalid amount to pay' : 'مبلغ غير صالح للدفع')
        return
      }

      setIsPaying(true)
      await api.patch('/booking/customer/payRemainingAmount', {
        bookingId: bookingDetails.id,
        amount: remainingAmount,
      })
      
      toast.success(lang === 'en' ? 'Payment processed successfully' : 'تم معالجة الدفع بنجاح')
      refetch()
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setIsPaying(false)
    }
  }

  const handleCancelBooking = () => {
    toggleCancel()
  }

  const handleRefundFullAmount = async () => {
    try {
      if (!bookingDetails) {
        toast.error('Booking details not available')
        return
      }

      const payment = bookingDetails.payments?.find((p) => p.type === 'booking')
      const paymentId = payment?.id 
      
      if (!paymentId) {
        toast.error('Payment information not found')
        return
      }

      setIsCancelling(true)
      await api.post(`/paymentRefund/customer`, {
        refundedAmount: bookingDetails?.grandTotal,
        type: 'booking', 
        paymentId: paymentId,
      })
      toast.success('Refund full amount successfully')
      
      // Store refund status in booking store to persist across refreshes
      addRefundedBooking(id)
      
      refetch()
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setIsCancelling(false)
    }
  }

  const onBookingCancel = async () => {
    try {
      setIsCancelling(true)
      await api.patch(`/booking/cancel/${id}`)
      confirmCancelToggle()
      toast.success('Booking Cancelled successfully')
      toggleCancel()
      refetch()
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setIsCancelling(false)
    }
  }

  const handleDownloadInvoice = async () => {
    try {
      if (!bookingDetails) {
        toast.error(lang === 'en' ? 'Booking details not available' : 'تفاصيل الحجز غير متاحة')
        return
      }

      const grandTotal = bookingDetails.grandTotal || 0
      const isHalfPaid = bookingDetails.paymentStatus === 'halfPaid'
      let paidAmount = grandTotal
      let remainingAmount = 0
      
      if (isHalfPaid) {
        const split = calculateSplitPayment(grandTotal)
        paidAmount = split.firstPayment
        remainingAmount = split.secondPayment
      }

      const invoiceData = {
        bookingId: bookingDetails.id,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        refundableAmount: String(bookingDetails.refundableDepositAmount || 200),
        totalAmount: grandTotal,
        chaletTitle: bookingDetails.chalet?.title || 'N/A',
        hostName: bookingDetails.chalet?.host?.fullName || 'N/A',
        guestName: userStore.user?.name || 'Guest Name',
        guestPhone: userStore.user?.phone || '+96512341234',
        guestEmail: userStore.user?.email || 'guest@example.com',
        createdAt: bookingDetails.createdAt || new Date().toISOString(),
        paymentStatus: bookingDetails.paymentStatus,
        paidAmount: paidAmount,
        remainingAmount: remainingAmount,
      }

      await generateBookingInvoicePDF(invoiceData, lang)
      toast.success(lang === 'en' ? 'Invoice downloaded successfully!' : 'تم تنزيل الفاتورة بنجاح!')
    } catch (error) {
      console.error('Error downloading invoice:', error)
      toast.error(lang === 'en' ? 'Failed to download invoice.' : 'فشل تنزيل الفاتورة.')
    }
  }

  if (isLoading) {
    return <div className="p-10 text-center">Loading booking details...</div>
  }

  if (!bookingDetails?.id) {
    return <div className="p-10 text-center">Booking details not found.</div>
  }

  return (
    <div className="2xl:px-22 xl:px-15 md:px-10 sm:px-7 px-3">
      <div className="lg:px-20 md:px-14 sm:px-10 px-8 mx-auto py-9">
        <h1 className="md:text-[39px] text-[24px] md:leading-[47px] leading-8 font-semibold text-[#19191A] sm:mb-2">
          {bookingDetails?.chalet?.title}
        </h1>
        <p className="mb-6 md:text-[20px] text-sm md:leading-[24px] leading-4 text-[#484A4C] sm:pt-0 pt-1">
          {
            lang === 'en' ? 'Track your stays, check-in details, and booking status here.' : 'يمكنك تتبع إقامتك وتفاصيل تسجيل الوصول وحالة الحجز هنا.'
          }
        </p>

        <div className="flex items-start justify-between lg:flex-nowrap flex-wrap gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg">
              <div className="lg:w-[470px] w-full pt-3">
                <Image
                  src={bookingDetails?.chalet?.photoURL}
                  alt={bookingDetails?.chalet?.title}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover rounded-lg"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center flex-wrap gap-2 pt-3">
                  <h3 className="text-[16px] font-medium text-[#19191A]">
                    {bookingDetails?.chalet?.title}
                  </h3>
                  <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[110px]">
                    <Image src="/images/Points.svg" width={16} height={16} alt="Points Icon" />
                    <span className="text-[#29397E] text-sm">
                      {calculateLoyaltyPoints(bookingDetails?.chalet?.noOfLoyalityPoints, bookingDetails?.noOfNights, bookingDetails?.noOfNights === 0)} Points
                    </span>
                  </div>
                </div>

                <Location
                  icon={<MapPin className="w-4 h-4 text-[#8E8E93]" />}
                  text={bookingDetails?.chalet?.city}
                  className="text-[#8E8E93] text-sm"
                />

                <PropertyInfo
                  guests={String(bookingDetails?.noOfGuests)}
                  propertyType={bookingDetails?.chalet?.isEntireHomeAvailabe ? 'Entire Home' : ''}
                  beds={Number(bookingDetails?.chalet?.maxNoOfBeds)}
                  baths={Number(bookingDetails?.chalet?.noOfBaths)}
                  amenities={bookingDetails?.chalet?.amenities?.map((item) => item?.title)}
                />

                <div className="flex items-center gap-3 flex-wrap">
                  <Button
                    onClick={handleViewDetails}
                    intent="transperent"
                    className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex gap-1 items-center"
                  >
                    View Chalet Details Page <ChevronRight className="w-3 h-3" strokeWidth={3} />
                  </Button>
                  <Button
                    onClick={handleViewLocation}
                    intent="transperent"
                    className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex  gap-1 items-center"
                  >
                    View Exact Location <ChevronRight className="w-3 h-3" strokeWidth={3} />
                  </Button>
                </div>
              </div>
            </div>

            <DateSection
              dateRange={{
                from: bookingDetails?.startDate,
                to: bookingDetails?.endDate,
              }}
            />
            <AddOnsSection addOns={addOns} />
            <ChaletRules lang={lang} messages={messages.common.chalet_rules}  />
          </div>

          <PaymentSection
            paymentStatus={bookingDetails?.paymentStatus}
            totalAmount={bookingDetails?.grandTotal}
            bookingStatus={bookingDetails?.bookingStatus}
            securityDeposit={bookingDetails?.refundableDepositAmount || 200}
            paymentDueDate={format(new Date(bookingDetails?.startDate), 'dd/MM/yyyy')}
            priceBreakdown={priceBreakdown}
            onPayRemaining={handlePayRemaining}
            onCancelBooking={handleCancelBooking}
            onRefundFullAmount={handleRefundFullAmount}
            onDownloadInvoice={handleDownloadInvoice}
            lang={lang}
            isRefunded={isRefunded}
            isPaying={isPaying}
          />
        </div>
      </div>
      <CancelBooking
        isOpen={isCancelOpen}
        setIsOpen={toggleCancel}
        onCancel={onBookingCancel}
        isCancelling={isCancelling}
        refundAmount={refundAmount}
        lang={lang}
        priceBreakdown={priceBreakdown}
        paymentStatus={bookingDetails?.paymentStatus}
        totalAmount={bookingDetails?.grandTotal}
        cancellationFee={-(bookingDetails?.chalet?.additionFeeForFullRefund || 0)}
        calculatedRefundAmount={(bookingDetails?.grandTotal || 0) - (bookingDetails?.chalet?.additionFeeForFullRefund || 0)}
      />
      <ModalDialog
        isOpen={isConfirmCancel}
        setIsOpen={confirmCancelToggle}
        className="lg:min-w-[524px] min-w-[auto]"
      >
        <div className="text-center">
          <Image
            src="/images/PayConfirm.svg"
            width={120}
            height={120}
            alt="Success"
            className="mx-auto"
          />
          <h3 className="md:text-[25px] text-xl font-semibold mt-4 text-[#19191A] pt-3">
            Booking Cancelled
          </h3>
          <p className=" md:text-xl text-[16px] text-[#484A4C] mt-2">
            Your booking has been successfully cancelled. If applicable, your refund will be
            processed according to the cancellation policy.
          </p>
          <div className="flex md:flex-row flex-col justify-between gap-4 pt-8">
            <Button
              onClick={() => router.push('/my-bookings/')}
              intent="ghost"
              className="cursor-pointer bg-[#F3F4F6] text-[#19191A] rounded-lg text-[16px] font-medium w-full"
            >
              Back to My Bookings
            </Button>
            <Button
              onClick={() => router.push('/explore/')}
              className="cursor-pointer bg-[#29397E] text-[#FDFDFE] rounded-lg text-[16px] font-medium !w-full"
            >
              Browse Chalets
            </Button>
          </div>
        </div>
      </ModalDialog>
      <ModalDialog
        isOpen={isOpen}
        setIsOpen={toggle}
        className=" w-full max-h-[calc(100vh-101px)] overflow-y-auto m-4"
      >
        <div className=" flex items-center justify-center  px-4">
          <div className="bg-white border border-yellow-400 text-yellow-700 p-6 rounded-lg shadow-md max-w-md text-center">
            <div className="flex justify-center mb-4">
              <ShieldOff />
            </div>
            <h2 className="text-lg font-semibold mb-2">Chalet Not Available</h2>
            <p className="text-sm text-gray-700">
              The chalet you're trying to see has been deleted or is no longer available.
            </p>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}
