'use client'
import React from 'react'
import { DropdownMenu, Avatar, Text, Flex } from '@radix-ui/themes'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useBookingStore } from '../../../stores/useBookingStore'
import { useUserStore } from '../../../stores/useUserStore'
import { useBuyLoyltyPointsStore } from '../../../stores/useBuyLoyltyPoints'

type UserProfileProps = {
  userName: string
  avatarSrc?: string
  onLogout: () => void
}

const UserProfile: React.FC<UserProfileProps> = ({ userName, avatarSrc = '' }) => {
  const { data: user } = useSession()
  const { resetBooking } = useBookingStore()
  const { clearUser } = useUserStore()
  const { resetPoints } = useBuyLoyltyPointsStore()
  const logOut = () => {
    useUserStore.getState().clearUser()
    signOut()
    resetBooking()
    resetPoints()
    clearUser()
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="p-0 focus-visible:outline-none focus:outline-none border-none">
          <Flex
            align="center"
            gap="2"
            className="cursor-pointer border-none outline-none font-medium"
          >
            <Avatar
              size="4"
              radius="full"
              fallback={<User size={25} color="#333" />}
              src={avatarSrc}
            />
            <h2 className="text-[16px] font-[500] text-[#19191A] leading-6">
              {user?.user?.fullName || userName}
            </h2>
            <ChevronDown className="text-[#19191A]" size={20} />
          </Flex>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-56 rounded-xl bg-[#F9FAFB] shadow-lg p-2" sideOffset={8}>
        <div className=" flex flex-col">
          <Link className="px-3 py-1 cursor-pointer text-[#484A4C]" href={'/profile'}>
            Profile
          </Link>
          <Link className="px-3 py-1 cursor-pointer text-[#484A4C]" href={'/notifications'}>
            Notifications
          </Link>
        </div>
        <div
          className="flex items-center gap-2 text-[#E41212] hover:bg-transparent cursor-pointer px-3 py-2 text-sm font-medium"
          onClick={logOut}
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
