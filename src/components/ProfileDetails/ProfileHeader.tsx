import { useSession } from 'next-auth/react'
import SocialLinkShare from '../SocialLinkShare'
import Image from 'next/image'
import useToggle from '@/lib/hooks/useToggle'

const ProfileHeader = () => {
  const { isOpen, toggle } = useToggle()
  const { data: user, status } = useSession()

  return (
    <>
      <div className="flex flex-col gap-4 items-start self-stretch">
        <span className="text-[28px] md:text-[39px] font-semibold leading-[1.2] text-[#19191a]">
          Your Profile
        </span>
        <span className="text-[16px] md:text-[20px] text-[#484a4c]">
          View and manage your personal details and loyalty points.
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
        {/* Profile Image */}
        <div className="flex items-center justify-center w-[96px] h-[104px]">
          <div className="relative w-[96px] h-[96px]">
            <div className="rounded-full w-full h-full bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/i3wsd1dC5N.png')] bg-cover bg-center" />
            <div className="absolute w-[40%] h-[37%] bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/RNdLFTnBUc.png')] bg-cover bg-center rounded-full right-0 bottom-0" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-2 w-full md:w-auto items-start">
          <span className="text-[20px] md:text-[25px] font-semibold text-[#19191a]">
            {user?.user?.fullName}
          </span>

          <div className="flex items-center gap-2 bg-[#e1f2ff] px-2 py-1 rounded-md">
            <div className="w-4 h-4 bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/MvZzetJcMk.png')] bg-cover bg-no-repeat" />
            <span className="text-sm text-[#29397e]">200 Points</span>
          </div>

          {/* Refer a Friend Button */}
          <div
            className="flex items-center gap-2 mt-2 rounded-full px-4 py-2 border border-[#29397e1a] cursor-pointer"
            onClick={toggle}
          >
            <div className="w-4 h-4 bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/jPFatpV24M.png')] bg-cover bg-no-repeat" />
            <span className="text-sm text-[#29397e] font-medium">Refer A Friend</span>
            <div className="w-3 h-3 bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/X9WMXVLgQH.png')] bg-cover bg-no-repeat" />
          </div>
        </div>
      </div>
      <SocialLinkShare open={isOpen} onClose={toggle} title="Refers A Friend" colRevers={true}>
        <div className="bg-[#F9FAFB] w-[161px] h-[161px] mx-auto rounded-[20px] flex justify-center items-center">
          <Image src={'/images/gift.svg'} alt="gift" width={119} height={119} />
        </div>
      </SocialLinkShare>
    </>
  )
}

export default ProfileHeader
