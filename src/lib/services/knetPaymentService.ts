import api from '@/lib/axios'

export interface KnetInitiatePaymentRequest {
  bookingId: string
  amount: number
  paymentType?: 'full' | 'split' // 'full' or 'split' payment
}

export interface KnetInitiatePaymentResponse {
  paymentUrl: string
  paymentId: string
  bookingId: string
}

/**
 * Initiates a KNET payment for a booking
 * Sends request to backend which calls KNET API and returns payment URL
 */
export const initiateKnetPayment = async (
  payload: KnetInitiatePaymentRequest,
): Promise<KnetInitiatePaymentResponse> => {
  try {
    const response = await api.post<KnetInitiatePaymentResponse>(
      '/payment/knet/initiate',
      payload,
    )
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Handles payment callback response from KNET
 * This is called after user returns from KNET payment page
 */
export const handleKnetResponse = async (
  paymentId: string,
  bookingId: string,
) => {
  try {
    const response = await api.get(`/payment/knet/response`, {
      params: {
        paymentId,
        bookingId,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
