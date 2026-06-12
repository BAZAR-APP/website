'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/Button/Button'
import api from '@/lib/axios'
import { toast } from '@/lib/toast'
import { useBookingStore } from '../../../../../stores/useBookingStore'
import { Locale } from '../../../../../i18n.config'

const PaymentSuccess: React.FC = () => {
  const router = useRouter()
  const params = useParams() as { lang: Locale }
  const searchParams = useSearchParams()
  const { lang } = params
  const [isVerifying, setIsVerifying] = useState(true)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const { resetBooking } = useBookingStore()

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentIdParam = searchParams.get('paymentId')
        const bookingIdParam = searchParams.get('bookingId')

        if (!paymentIdParam || !bookingIdParam) {
          toast.error(lang === 'en' ? 'Invalid payment parameters' : 'معاملات الدفع غير صحيحة')
          router.push(`/${lang}/my-bookings`)
          return
        }

        setPaymentId(paymentIdParam)
        setBookingId(bookingIdParam)

        // Verify payment status with backend
        // The backend already updated the payment status when KNET POSTed to /payment/knet/response
        // This is just to confirm the status on frontend
        const response = await api.get(`/booking/${bookingIdParam}`)

        if (response?.data?.paymentStatus === 'COMPLETED' || response?.data?.paymentStatus === 'completed') {
          // Payment verified successfully
          toast.success(lang === 'en' ? 'Payment successful!' : 'تم الدفع بنجاح!')
          resetBooking()
          setIsVerifying(false)
        } else {
          toast.error(lang === 'en' ? 'Payment verification failed' : 'فشل التحقق من الدفع')
          router.push(`/${lang}/my-bookings`)
        }
      } catch (error) {
        console.error('Payment verification error:', error)
        toast.error(
          lang === 'en'
            ? 'An error occurred while verifying payment'
            : 'حدث خطأ أثناء التحقق من الدفع',
        )
        router.push(`/${lang}/my-bookings`)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [searchParams, lang, router, resetBooking])

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {lang === 'en' ? 'Verifying payment...' : 'جاري التحقق من الدفع...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
            <CheckCircle className="w-20 h-20 text-green-600 relative z-10" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {lang === 'en' ? 'Payment Successful!' : 'تم الدفع بنجاح!'}
        </h1>
        <p className="text-gray-600 mb-6">
          {lang === 'en'
            ? 'Your booking has been confirmed. Your reservation is now secure.'
            : 'تم تأكيد حجزك. حجزك آمن الآن.'}
        </p>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          {bookingId && (
            <div className="mb-2">
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Booking ID' : 'معرّف الحجز'}
              </p>
              <p className="font-mono text-lg font-semibold text-gray-900">{bookingId}</p>
            </div>
          )}
          {paymentId && (
            <div>
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Payment ID' : 'معرّف الدفع'}
              </p>
              <p className="font-mono text-lg font-semibold text-gray-900">{paymentId}</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-blue-900 mb-3">
            {lang === 'en' ? 'What happens next?' : 'ماذا يحدث الآن؟'}
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>
                {lang === 'en'
                  ? 'A confirmation email has been sent to your inbox'
                  : 'تم إرسال بريد تأكيد إلى بريدك الإلكتروني'}
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>
                {lang === 'en'
                  ? 'Your booking details are saved in your account'
                  : 'تم حفظ تفاصيل حجزك في حسابك'}
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>
                {lang === 'en'
                  ? 'You will receive check-in details 24 hours before your stay'
                  : 'ستتلقى تفاصيل تسجيل الوصول قبل 24 ساعة من إقامتك'}
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href={`/${lang}/my-bookings/${bookingId}`}>
            <Button className="w-full">
              {lang === 'en' ? 'View Booking Details' : 'عرض تفاصيل الحجز'}
            </Button>
          </Link>
          <Link href={`/${lang}`}>
            <Button intent="secondary" className="w-full">
              {lang === 'en' ? 'Back to Home' : 'العودة إلى الصفحة الرئيسية'}
            </Button>
          </Link>
        </div>

        {/* Support Message */}
        <p className="text-xs text-gray-500 mt-6">
          {lang === 'en'
            ? 'Need help? Contact our support team at support@example.com'
            : 'هل تحتاج إلى مساعدة؟ اتصل بفريق الدعم لدينا'}
        </p>
      </div>
    </div>
  )
}

export default PaymentSuccess
