'use client'
import React from 'react'
import { DropdownMenu, Avatar, Text, Flex } from '@radix-ui/themes'
import { ChevronDown, LogOut } from 'lucide-react'
import { getUserNameInitials } from '@/lib/constant'

type UserProfileProps = {
  userName: string
  avatarSrc?: string
  onLogout: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ userName, avatarSrc = '', onLogout }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="p-0 focus-visible:outline-none focus:outline-none border-none">
          <Flex align="center" gap="2" className="cursor-pointer border-none outline-none">
            <Avatar
              size="3"
              radius="full"
              fallback={getUserNameInitials(userName)}
              src={avatarSrc}
            />
            <Text weight="medium" size="2" color="gray">
              {userName}
            </Text>
            <ChevronDown size={16} />
          </Flex>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-56 rounded-xl bg-[#F9FAFB] shadow-lg p-2" sideOffset={8}>
        <div className="px-3 py-1 cursor-pointer text-[#484A4C]">
          <Text size="2" weight="medium" color="gray">
            Notifications
          </Text>
        </div>
        <div
          className="flex items-center gap-2 text-[#E41212] hover:bg-transparent cursor-pointer px-3 py-2 text-sm font-medium"
          onClick={onLogout}
        >
          <Text size="2" weight="medium">
            Log Out
          </Text>
          <LogOut size={16} />
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default UserProfile
