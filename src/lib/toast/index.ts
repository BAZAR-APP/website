'use client'

import { toast as baseToast } from 'react-hot-toast'

export const toast = {
  success: (message: string, options = {}) => baseToast.success(message, options),
  error: (message: string, options = {}) => baseToast.error(message, options),
  info: (message: string, options = {}) => baseToast(message, { icon: 'ℹ️', ...options }),
  loading: (message: string, options = {}) => baseToast.loading(message, options),
  dismiss: baseToast.dismiss,
}
