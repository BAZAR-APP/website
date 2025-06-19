import axios, { AxiosError, AxiosResponse } from 'axios'
import { getSession, signOut } from 'next-auth/react'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NESTJS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (session?.user?.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${session?.user.accessToken}`
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
