'use client'

import { TextField, Text, Flex } from '@radix-ui/themes'
import { ReactNode } from 'react'

type CommonInputProps = {
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
  className?: string
  icon?: ReactNode
  prefix?: string
  readonly?: boolean
}

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  name,
  className,
  icon,
  prefix,
  readonly = false,
}) => {
  const inputId = name || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <Flex direction="column" gap="2">
      {label && (
        <Text as="label" htmlFor={inputId} className="!text-primary text-[14px] font-normal">
          {label}
        </Text>
      )}
      <TextField.Root
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="surface"
        className={className}
        readOnly
      >
        {icon && !prefix && <TextField.Slot className="pl-2">{icon}</TextField.Slot>}
        {prefix && icon && (
          <TextField.Slot className="pr-1 text-[#484A4C] text-sm font-medium">
            {icon} {prefix}
          </TextField.Slot>
        )}
      </TextField.Root>
    </Flex>
  )
}

export default CommonInput
