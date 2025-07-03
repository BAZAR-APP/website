import React, { useEffect, useState } from 'react'
import ModalDialog from '../ModalDialog/Dialog'
import { Switch } from 'radix-ui'
import axios from 'axios'
import api, { useQueryBase } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'

type NotificationType = {
  id: string
  title: string
}

type UserNotificationSetting = {
  userId: string
  notificationTypeId: string
  IsInAppAllowed: boolean
  IsEmailAllowed: boolean
  id: string
}

type NotificationOption = {
  label: string
  switchId: 'inApp' | 'email'
  checked: boolean
}

type NotificationItem = {
  title: string
  typeId: string
  options: NotificationOption[]
}

type NotificationSettingsDialogProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const NotificationSettingsDialog: React.FC<NotificationSettingsDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const { data: session } = useSession()
  const { data: typesRes, isLoading: loadingTypes } = useQueryBase({
    queryKey: ['notificationTypes'],
    url: '/notificationTypes',
  })

  const types = typesRes?.data?.data as NotificationType[]
  const {
    data: userSettingsRes,
    refetch: refetchUserSettings,
    isLoading: loadingSettings,
  } = useQueryBase({
    queryKey: ['userNotificationSettings'],
    url: '/userNotificationSettings',
  })
  const userSettings = userSettingsRes?.data?.data as UserNotificationSetting[]
  useEffect(() => {
    if (!types || !userSettings) return

    const merged: NotificationItem[] = types.map((type) => {
      const setting = userSettings.find((s) => s.notificationTypeId === type.id)

      return {
        title: type.title,
        typeId: type.id,
        options: [
          {
            label: 'In-App',
            switchId: 'inApp',
            checked: setting?.IsInAppAllowed ?? false,
          },
          {
            label: 'Email',
            switchId: 'email',
            checked: setting?.IsEmailAllowed ?? false,
          },
        ],
      }
    })

    setNotifications(merged)
  }, [types, userSettings])

  const handleToggle = async (itemIndex: number, optionIndex: number) => {
    const updated = [...notifications]
    const notif = updated[itemIndex]
    const option = notif.options[optionIndex]

    option.checked = !option.checked
    setNotifications(updated)

    const existingSetting = userSettings?.find((s) => s.notificationTypeId === notif.typeId)

    const payload: Partial<UserNotificationSetting> = {
      userId: session?.user?.id || '',
      notificationTypeId: notif.typeId,
      IsInAppAllowed: notif.options.find((opt) => opt.switchId === 'inApp')?.checked ?? false,
      IsEmailAllowed: notif.options.find((opt) => opt.switchId === 'email')?.checked ?? false,
    }

    try {
      if (existingSetting?.id) {
        await api.patch(`/userNotificationSettings/update/${existingSetting.id}`, payload)
      } else {
        await api.post('/userNotificationSettings', payload)
      }

      await refetchUserSettings()
    } catch (error) {
      toast.error(extractErrorMessage(error))
      option.checked = !option.checked
      setNotifications([...updated])
    }
  }

  const NotificationOption: React.FC<{
    label: string
    checked: boolean
    switchId: string
    onToggle: () => void
  }> = ({ label, checked, switchId, onToggle }) => (
    <div className="flex items-center justify-between gap-2">
      <label
        htmlFor={switchId}
        className="text-[#484A4C] sm:text-base text-[15px] font-normal leading-[19px]"
      >
        {label}
      </label>
      <Switch.Root
        id={switchId}
        className="w-[42.5px] h-6 bg-[#F3F4F6] flex items-center rounded-full cursor-pointer relative data-[state=checked]:bg-[#29397E] transition-colors flex-shrink-0"
        checked={checked}
        onCheckedChange={onToggle}
      >
        <Switch.Thumb
          className="block w-[20.8px] h-[20.8px] mt-[0.8px] bg-[#FDFDFE] border border-[#FDFDFE] rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-5 flex-shrink-0"
          style={{ boxShadow: '-0.16px 2.24px 2.88px rgba(0, 0, 0, 0.35)' }}
        />
      </Switch.Root>
    </div>
  )

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
          <div key={item.typeId}>
            <p className="text-[#19191A] sm:text-base text-[15px] font-medium leading-[150%] mb-5">
              {item.title}
            </p>
            <div className="flex flex-col gap-4">
              {item.options.map((option, optionIndex) => {
                const id = `${itemIndex}-${optionIndex}`
                return (
                  <NotificationOption
                    key={id}
                    label={option.label}
                    checked={option.checked}
                    switchId={id}
                    onToggle={() => handleToggle(itemIndex, optionIndex)}
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
