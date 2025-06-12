import React, { useState } from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import { Switch } from 'radix-ui'
import { initialNotificationItems } from '@/lib/constant'

export type NotificationItem = {
  title: string
  options: { label: string; checked: boolean; switchId: string }[]
}

type NotificationSettingsDialogProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

type NotificationOptionProps = {
  label: string
  checked: boolean
  switchId: string
  onToggle: () => void
}

const NotificationOption: React.FC<NotificationOptionProps> = ({
  label,
  checked,
  switchId,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={switchId} className="text-[#484A4C] text-base font-normal leading-[19px]">
        {label}
      </label>
      <Switch.Root
        id={switchId}
        className="w-[42.5px] h-6 bg-[#F3F4F6] rounded-full cursor-pointer relative data-[state=checked]:bg-[#29397E] transition-colors flex-shrink-0"
        checked={checked}
        onCheckedChange={onToggle}
      >
        <Switch.Thumb className="block w-[20.8px] h-[20.8px]  bg-[#FDFDFE] border border-[#FDFDFE] shadow-md rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5 flex-shrink-0" />
      </Switch.Root>
    </div>
  )
}

const NotificationSettingsDialog: React.FC<NotificationSettingsDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [notifications, setNotifications] = useState(initialNotificationItems)

  const toggleOption = (itemIndex: number, optionIndex: number) => {
    setNotifications((prev) =>
      prev.map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              options: item.options.map((opt, j) =>
                j === optionIndex ? { ...opt, checked: !opt.checked } : opt,
              ),
            }
          : item,
      ),
    )
  }

  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Notification Settings"
      className="max-w-2xl lg:max-w-[650px] max-h-[90vh] text-[#19191A] sm:px-5"
    >
      <p className="md:text-xl text-sm text-[#484A4C] pb-6 pt-1">
        Choose how you want to stay updated about your bookings, offers, and account activity.
      </p>

      <div className="space-y-6 overflow-y-auto">
        {notifications.map((item, itemIndex) => (
          <div key={item.title}>
            <p className="text-[#19191A] text-base font-medium leading-[150%] mb-5">{item.title}</p>
            <div className="flex flex-col gap-4">
              {item.options.map((option, optionIndex) => {
                const switchId = `${itemIndex}-${optionIndex}`
                return (
                  <NotificationOption
                    key={switchId}
                    label={option.label}
                    checked={option.checked}
                    switchId={switchId}
                    onToggle={() => toggleOption(itemIndex, optionIndex)}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ModalDialog>
  )
}

export default NotificationSettingsDialog
