import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { getSession, signOut } from 'next-auth/react'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NESTJS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
let cachedToken: string | null = null

api.interceptors.request.use(
  async (config) => {
    if (!cachedToken) {
      const session = await getSession()
      cachedToken = session?.user?.accessToken || null
    }

    if (cachedToken && config.headers) {
      config.headers.Authorization = `Bearer ${cachedToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      if (status === 401 || status === 403) {
        await signOut({ callbackUrl: '/en/login' })
      }
    }
    return Promise.reject(error)
  },
)

export default api

export const fetcher = async (url: string) => {
  const res = await api.get(url)
  return res?.data
}

export interface UseQueryBaseParams {
  queryKey: unknown[] // or a more specific type if known
  url: string
  params?: Record<string, any>
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  cacheTime?: number
  staleTime?: number
}

export const useQueryBase = ({
  queryKey,
  url,
  params = {},
  enabled = true,
  refetchOnWindowFocus = false,
  cacheTime = 1000 * 60 * 60 * 24,
  staleTime = 1000 * 60 * 60 * 24,
}: UseQueryBaseParams) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.get(url, { params })

      return response
    },
    enabled,
    refetchOnWindowFocus,
    gcTime: cacheTime,
    staleTime,
  })
}
// export async function sendSMS({ phoneNumber, message }: { phoneNumber: string; message: string }) {
//   const res = await fetch('/api/send-sms', {
//     method: 'POST',
//     body: JSON.stringify({ phoneNumber, message }),
//     headers: { 'Content-Type': 'application/json' },
//   })

//   await res.json()
// }
export async function sendSMS({
  phoneNumber,
  message,
}: { phoneNumber: string; message: string }) {
  try {
    // Env values (with fallbacks)
    const username = process.env.NEXT_PUBLIC_SMSBOX_USERNAME || 'valueandgrowth'
    const password = process.env.NEXT_PUBLIC_SMSBOX_PASSWORD || 'VGA112233@'
    const customerId = process.env.NEXT_PUBLIC_SMSBOX_CUSTOMER_ID || '3441'
    const senderText = process.env.NEXT_PUBLIC_SMSBOX_SENDER_TEXT || 'V G A'

    // Encode values
    const encodedMessage = `Your verification code is: ${encodeURIComponent(message)}`
    const encodedSender = encodeURIComponent(senderText)

    // Build URL
    const url =
      `https://smsbox.com/smsgateway/services/messaging.asmx/Http_SendSMS` +
      `?username=${username}` +
      `&password=${password}` +
      `&customerid=${customerId}` +
      `&sendertext=${encodedSender}` +
      `&messagebody=${encodedMessage}` +
      `&recipientnumbers=${phoneNumber}` +
      `&defdate=&isblink=false&isflash=false`

      console.log(url);
      
    const response = await axios.post(url)

    if (response.status === 200) {
      console.log('✅ SMS sent successfully')
      return { success: true }
    } else {
      console.log('❌ Failed to send SMS', response)
      return { success: false }
    }
  } catch (error) {
    console.log('❌ SMS Error:', error)
    return { success: false, error }
  }
}