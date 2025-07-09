import { useSession } from 'next-auth/react'
import SocialLinkShare from '../SocialLinkShare'
import Image from 'next/image'
import useToggle from '@/lib/hooks/useToggle'
import api from '@/lib/axios'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import { useRef, useState } from 'react'
import { User } from 'lucide-react'

const ProfileHeader = () => {
  const { isOpen, toggle } = useToggle()
  const { data: user, update } = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const fileType = file.type
      const { data: uploadData } = await api.post('/users/profile/upload-link?linkType=photo', {
        fileType,
      })

      const formData = new FormData()
      Object.entries(uploadData.fields).forEach(([key, value]) =>
        formData.append(key, value as string),
      )
      formData.append('Content-Type', fileType)
      formData.append('file', file)

      await fetch(uploadData.url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })

      await api.patch('/users/updateProfile', {
        fullName: user?.user?.fullName,
        photoId: uploadData?.uploadId,
        isUpdatingAddress: false,
      })
      await update()
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setIsUploading(false)
    }
  }

  const handleCameraClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        toast.error('File type must be JPG or PNG')
        return
      }

      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        toast.error('File size must be less than 5MB')
        return
      }

      handleImageUpload(file)
    }
    event.target.value = ''
  }

  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
  )

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

      <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
        <div className="flex items-center justify-center w-[96px] h-[104px]">
          <div className="relative w-[96px] h-[96px] group">
            {user?.user?.photoURL ? (
              <div
                className={`rounded-full w-full h-full bg-cover bg-center transition-all duration-200 ${
                  isUploading ? 'opacity-70' : ''
                }`}
                style={{
                  backgroundImage: `url(${user.user.photoURL})`,
                }}
              />
            ) : (
              <div className="rounded-full w-full h-full flex items-center justify-center bg-[#edf3f9]">
                <User size={55} color="#333" />
              </div>
            )}

            <div
              className={`absolute w-[40%] h-[37%] rounded-full right-[-10px] bottom-0 
                flex items-center justify-center transition-all duration-200
                ${
                  isUploading
                    ? 'bg-blue-500 cursor-not-allowed'
                    : "bg-[url('/images/camera.svg')] bg-cover bg-center cursor-pointer hover:scale-110 group-hover:shadow-lg"
                }
                ${isUploading ? '' : 'hover:bg-blue-50'}
              `}
              onClick={handleCameraClick}
            >
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-0 w-full md:w-auto items-start">
          <span className="text-[20px] md:text-[25px] font-semibold text-[#19191a]">
            {user?.user?.fullName}
          </span>

          <div className="flex items-center gap-2 bg-[#e1f2ff] px-2 py-1 rounded-md">
            <div className="w-4 h-4 bg-[url('https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/MvZzetJcMk.png')] bg-cover bg-no-repeat" />
            <span className="text-sm text-[#29397e]">200 Points</span>
          </div>

          <div
            className="flex items-center gap-2 mt-2 rounded-full py-2 cursor-pointer hover:bg-gray-50 px-2 -mx-2 transition-colors duration-200"
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
