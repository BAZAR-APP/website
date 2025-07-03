'use client'

import { ReactNode } from 'react'
import { Text, Flex } from '@radix-ui/themes'

type CommonInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?:
  | 'number'
  | 'search'
  | 'time'
  | 'text'
  | 'hidden'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'password'
  | 'tel'
  | 'url'
  | 'week'
  name?: string
  autoComplete?: string
  className?: string
  icon?: ReactNode
  prefix?: string
  readonly?: boolean
  error?: boolean
  errorMessage?: string
  maxLength?: number
}

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  name,
  className = '',
  icon,
  prefix,
  readonly = false,
  error = false,
  errorMessage = '',
  autoComplete = 'off',
  maxLength,
  ...rest
}) => {
  const inputId = name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <Flex direction="column" gap="2">
      {label && (
        <Text as="label" htmlFor={inputId} className="!text-primary text-[14px] font-normal">
          {label}
        </Text>
      )}
      <div
        className={`flex items-center min-h-[42px] w-full rounded-lg bg-gray-50 px-3 gap-2 ${className}`}
      >
        {icon && !prefix && <span className="text-gray-500">{icon}</span>}
        {icon && prefix && (
          <span className="flex items-center gap-1 text-[#484A4C] text-sm font-medium pr-2">
            {icon}
            {prefix}
          </span>
        )}
        {!icon && prefix && <span className="text-[#484A4C] text-sm font-medium pr-2">{prefix}</span>}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readonly}
          className="w-full bg-transparent outline-none text-sm text-[#484A4C] font-normal placeholder:text-[#484A4C] hover:outline-none hover:ring-0 focus:outline-none focus:ring-0"
          maxLength={maxLength}
          autoComplete={autoComplete}
          {...rest}
        />
      </div>
      {error && errorMessage && <p className="text-red-500 text-[12px] transition-all">{errorMessage}</p>}
    </Flex>
  )
}

export default CommonInput
