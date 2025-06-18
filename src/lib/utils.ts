import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from './toast'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const copyToClipboard = async (content: any) => {
  try {
    await navigator.clipboard.writeText(content)
    toast.success('Link copied to clipboard!')
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = content
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    toast.success('Link copied to clipboard!')
  }
}
export function extractErrorMessage(error: any): string {
  if (!error) return 'Unknown error occurred'

  if (error.response && error.response.data) {
    const data = error.response.data

    if (typeof data === 'string') return data

    if (typeof data.message === 'string') return data.message

    if (Array.isArray(data.message)) return data.message.join(', ')

    if (typeof data.message === 'string') return data.message

    return JSON.stringify(data)
  }

  if (error.message) return error.message

  if (typeof error === 'string') return error

  return 'Something went wrong'
}

export function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
