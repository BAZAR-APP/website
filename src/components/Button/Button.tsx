import React from 'react'
import { clsx } from 'clsx'
import { buttonStyles } from './styles/buttonStyles'
import { Slot } from '@radix-ui/themes'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  intent?: 'primary' | 'secondary' | 'ghost' | 'transperent' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'responsive'
  asChild?: boolean // for Radix `Slot`
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  intent = 'primary',
  size = 'responsive',
  asChild = false,
}) => {
  const isDisabled = loading || disabled
  const Comp = asChild ? Slot : 'button'

  const innerContent = (
    <>
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </>
  )

  return (
    <Comp
      type={asChild ? undefined : type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={clsx(buttonStyles({ intent, size, disabled: isDisabled }), className)}
    >
      {asChild ? <span className="flex items-center">{innerContent}</span> : innerContent}
    </Comp>
  )
}

export default Button
