import { useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from '@/lib/toast'
import { initiateKnetPayment } from '@/lib/services/knetPaymentService'
import { extractErrorMessage } from '@/lib/utils'
import { Locale } from '../../../i18n.config'

interface UseKnetPaymentOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const useKnetPayment = (options?: UseKnetPaymentOptions) => {
  const router = useRouter()
  const params = useParams() as { lang: Locale }
  const { lang } = params
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initiatePayment = useCallback(
    async (bookingId: string, amount: number, paymentType: 'full' | 'split' = 'full') => {
      setIsLoading(true)
      setError(null)

      try {
        // Validate inputs
        if (!bookingId || !amount || amount <= 0) {
          throw new Error(
            lang === 'en' ? 'Invalid booking or amount' : 'حجز أو مبلغ غير صحيح',
          )
        }

        // Call backend to initiate KNET payment
        const response = await initiateKnetPayment({
          bookingId,
          amount,
          paymentType,
        })

        // Check if we got a payment URL
        if (!response.paymentUrl) {
          throw new Error(
            lang === 'en' ? 'Failed to get payment URL from KNET' : 'فشل في الحصول على رابط الدفع',
          )
        }

        // Store payment info in sessionStorage (optional, for recovery if needed)
        sessionStorage.setItem(
          'knet_payment_info',
          JSON.stringify({
            bookingId,
            paymentId: response.paymentId,
            amount,
            timestamp: new Date().toISOString(),
          }),
        )

        // Redirect user to KNET payment page
        window.location.href = response.paymentUrl

        // Call onSuccess callback if provided
        options?.onSuccess?.()
      } catch (err) {
        const errorMessage = extractErrorMessage(err)
        setError(errorMessage)

        // Show error toast
        toast.error(
          errorMessage ||
            (lang === 'en' ? 'Failed to initiate payment' : 'فشل في بدء الدفع'),
        )

        // Call onError callback if provided
        options?.onError?.(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [lang, options],
  )

  return {
    initiatePayment,
    isLoading,
    error,
  }
}
