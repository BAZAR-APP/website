import React, { FC } from 'react'
import { Popover, Text, Box, Separator } from '@radix-ui/themes'

const CustomPopOver: FC<{
  triggerChildren: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}> = ({ children, triggerChildren, isOpen, onClose }) => {
  return (
    <Popover.Root open={isOpen} onOpenChange={onClose}>
      <Popover.Trigger>{triggerChildren}</Popover.Trigger>
      <Popover.Content
        align="start"
        className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50"
      >
        {children}
      </Popover.Content>
    </Popover.Root>
  )
}

export default CustomPopOver
