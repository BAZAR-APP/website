import { cva } from 'class-variance-authority'

export const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'text-primary-foreground bg-primary-blue hover:bg-primary-blue hover:opacity-90',
        secondary: 'bg-[#F3F4F6] text-[#29397E] hover:bg-[#e4e5e7]',
        ghost: ' text-gray bg-gray-100 hover:bg-gray-100',
        transperent: ' text-[#19191A] bg-transperent',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base w-full',
        lg: 'h-[48px] px-5 py-3 text-base', // default desktop size
        responsive: 'px-5 py-3',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'responsive',
      disabled: false,
    },
  },
)
