'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { XCircle } from 'lucide-react'
import Button from '@/components/Button/Button'
import { toast } from '@/lib/toast'
import { Locale } from '../../../../../i18n.config'

const PaymentFailed: React.FC = () => {
  const router = useRouter()
  const params = useParams() as { lang: Locale }
  const searchParams = useSearchParams()
  const { lang } = params
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [failureReason, setFailureReason] = useState<string | null>(null)

  useEffect(() => {
    const bookingIdParam = searchParams.get('bookingId')
    const reasonParam = searchParams.get('reason')

    if (bookingIdParam) {
      setBookingId(bookingIdParam)
    }

    if (reasonParam) {
      setFailureReason(reasonParam)
    }

    // Show error toast
    const errorMessage = reasonParam || (lang === 'en' ? 'Payment failed' : 'فشل الدفع')
    toast.error(errorMessage)
  }, [searchParams, lang])

  const handleRetryPayment = () => {
    if (bookingId) {
      router.push(`/${lang}/my-bookings/complete-payment?bookingId=${bookingId}`)
    } else {
      router.push(`/${lang}/my-bookings`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
            <XCircle className="w-20 h-20 text-red-600 relative z-10" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {lang === 'en' ? 'Payment Failed' : 'فشل الدفع'}
        </h1>
        <p className="text-gray-600 mb-6">
          {lang === 'en'
            ? 'Unfortunately, your payment could not be processed. Please try again.'
            : 'للأسف، تعذر معالجة الدفع. يرجى المحاولة مرة أخرى.'}
        </p>

        {/* Failure Reason */}
        {failureReason && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-red-800">
              <strong>{lang === 'en' ? 'Reason: ' : 'السبب: '}</strong>
              {failureReason}
            </p>
          </div>
        )}

        {/* Booking ID */}
        {bookingId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">
              {lang === 'en' ? 'Booking ID' : 'معرّف الحجز'}
            </p>
            <p className="font-mono text-lg font-semibold text-gray-900">{bookingId}</p>
          </div>
        )}

        {/* Troubleshooting Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-yellow-900 mb-3">
            {lang === 'en' ? 'Please try:' : 'يرجى المحاولة:'}
          </h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• {lang === 'en' ? 'Verify your card details are correct' : 'تحقق من أن تفاصيل بطاقتك صحيحة'}</li>
            <li>• {lang === 'en' ? 'Ensure you have sufficient funds' : 'تأكد من وجود رصيد كافي'}</li>
            <li>• {lang === 'en' ? 'Try a different payment method' : 'جرب طريقة دفع مختلفة'}</li>
            <li>• {lang === 'en' ? 'Contact your bank if the issue persists' : 'اتصل بالبنك إذا استمرت المشكلة'}</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full" onClick={handleRetryPayment}>
            {lang === 'en' ? 'Retry Payment' : 'إعادة محاولة الدفع'}
          </Button>
          <Link href={`/${lang}/my-bookings`}>
            <Button intent="secondary" className="w-full">
              {lang === 'en' ? 'Go to My Bookings' : 'الذهاب إلى حجوزاتي'}
            </Button>
          </Link>
          <Link href={`/${lang}`}>
            <Button intent="secondary" className="w-full !text-gray-700">
              {lang === 'en' ? 'Back to Home' : 'العودة إلى الصفحة الرئيسية'}
            </Button>
          </Link>
        </div>

        {/* Support Message */}
        <p className="text-xs text-gray-500 mt-6">
          {lang === 'en'
            ? 'Still having issues? Contact our support team'
            : 'لا تزال تواجه مشاكل؟ اتصل بفريق الدعم لدينا'}
        </p>
      </div>
    </div>
  )
}

export default PaymentFailed
