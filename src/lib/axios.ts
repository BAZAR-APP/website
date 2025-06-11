// lib/axios.ts
import axios, { AxiosError, AxiosResponse } from 'axios'
import { getSession, signOut } from 'next-auth/react'

const api = axios.create({
  baseURL: process.env.NESTJS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor – attach token
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

// Response interceptor – handle success & errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status

      // Handle specific status codes
      if (status === 401 || status === 403) {
        await signOut({ callbackUrl: '/en/login' }) // or your custom login route
      }

      // Optionally show toast or log error
      console.error('API error:', {
        status: error.response.status,
        message: error.response.data,
      })
    } else {
      console.error('Network or unknown error:', error.message)
    }

    return Promise.reject(error)
  },
)

export default api
