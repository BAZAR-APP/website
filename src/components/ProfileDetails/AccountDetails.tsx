'use client'
import Image from 'next/image'
import CommonInput from '../CommonInput/Input'
import ModalDialog from '../ModalDialog/Dialog'
import useToggle from '@/lib/hooks/useToggle'
import Button from '../Button/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileUpdateSchema } from '@/lib/validationSchemas'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import api from '@/lib/axios'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import ProfileOTPModal from './ProfileOTPModal'
import PhoneOtpVerification from '../PhoneOtpVerification'
// import ProfileSuccessModal from "./ProfileSuccessModal"
// import ProfileOTPModal from "./ProfileOTPModal"
interface PhoneChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

interface userFormData {
  phone: string
  email: string
  fullName: string
}
const AccountDetails = () => {
  const verifyPhoneModel = useToggle(false)
  const { data: user, update } = useSession()

  const {
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    setValue,
    watch,
  } = useForm<userFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      phone: '',
      email: '',
      fullName: '',
    },
  })
  useEffect(() => {
    if (user?.user?.id) {
      setValue('fullName', user.user.fullName || '')
      setValue('phone', user.user.phoneNumber || '')
      setValue('email', user.user.email || '')
    }
  }, [user?.user?.id])

  const handlePhoneChange = (e: PhoneChangeEvent): void => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8)
    setValue('phone', value, { shouldValidate: true })
  }

  const onSubmit = async (data: userFormData) => {
    try {
      const body = {
        fullName: data?.fullName,
        phoneNumber: data?.phone,
        callingCode: '+965',
        countryCode: 'KW',
        isUpdatingAddress: false,
      }
      await api.patch('/users/updateProfile', body)
      await update()
      toast.success('Profile updated successfully!')
      if (user?.user?.phoneNumber !== data?.phone) {
        verifyPhoneModel.open()
      }
    } catch (error) {
      toast.error(extractErrorMessage(error))
    }
  }

  return (
    <>
      <div className="flex w-[710px] flex-col gap-[40px] items-start shrink-0 flex-nowrap relative z-[38]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[32px]">
          <CommonInput
            name="fullName"
            placeholder=""
            value={watch('fullName')}
            onChange={(e) => setValue('fullName', e.target.value, { shouldValidate: true })}
            label="Full Name"
            className={'bg-[#F9FAFB] text-[#484A4C] rounded-[8px]'}
            error={!!errors?.fullName}
            errorMessage={errors?.fullName?.message}
          />
          <CommonInput
            icon={
              <Image src={'/images/countryFlag.svg'} alt="Country Flag" width={16} height={16} />
            }
            prefix="+965"
            name="phone"
            className={
              '!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px] text-sm sm:text-base'
            }
            type="text"
            label="Phone"
            value={watch('phone')}
            onChange={handlePhoneChange}
            maxLength={8}
            error={!!errors?.phone}
            errorMessage={errors?.phone?.message}
          />
          <CommonInput
            name="email"
            placeholder=""
            value={watch('email')}
            onChange={(e) => setValue('email', e.target.value, { shouldValidate: true })}
            label="Email"
            className={'bg-[#F9FAFB] text-[#484A4C] rounded-[8px]'}
            error={!!errors?.email}
            errorMessage={errors?.email?.message}
            readonly
          />
          <div className="flex w-[330px] h-[117px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[52]">
            <span className="h-[17px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#19191a] relative text-left overflow-hidden whitespace-nowrap z-[53]">
              Home or ID Address
            </span>
            <div className="flex w-[330px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#f9fafb] rounded-[8px] relative overflow-hidden z-[54]">
              <span className="flex w-[298px] justify-start items-start self-stretch grow shrink-0 basis-0 font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#484a4c] relative text-left overflow-hidden z-[55]">
                Sea Villa Retreat, Block 5, Street 12, Villa 27, Al Khiran, Ahmadi, Kuwait 64021
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[56]">
            <div className="flex pt-[8px] pr-0 pb-[8px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative z-[57]">
              <div className="flex w-[190px] pt-[12px] pr-[20px] pb-[12px] pl-[20px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#29397e] rounded-[8px] relative overflow-hidden z-[58]">
                <Button
                  disabled={isSubmitting || !isValid}
                  className="h-[24px]  text-[16px] font-medium  text-[#fff] "
                  type="submit"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* <ModalDialog
        title={'Refere A Friend'}
        isOpen={isOpen}
        setIsOpen={toggle}
        className="!max-w-[486px] w-full max-h-[calc(100vh-80px)] overflow-y-auto m-4 py-2 lg:max-h-none lg:overflow-y-visible"
      >
        <ReferModal />
        <Button
          className="h-[48px] w-[100%] !bg-[#F3F4F6] text-[16px] font-medium leading-[24px] !text-[#1F2A37] mt-[32px]"
          onClick={toggle}
        >
          Save Changes
        </Button>
      </ModalDialog> */}
      <ModalDialog
        title={''}
        isOpen={verifyPhoneModel?.isOpen}
        setIsOpen={verifyPhoneModel?.open}
        className="!max-w-[486px] w-full max-h-[calc(100vh-80px)] overflow-y-auto m-4 py-2 lg:max-h-none lg:overflow-y-visible"
      >
        <ProfileOTPModal>
          <PhoneOtpVerification
            userId={user?.user?.id}
            handleSuccess={verifyPhoneModel.close}
            phone={user?.user?.phoneNumber}
          />
        </ProfileOTPModal>
      </ModalDialog>

      {/* <ModalDialog
                title={''}
                isOpen={isOpen}
                setIsOpen={toggle}
                className="!max-w-[486px] w-full max-h-[calc(100vh-80px)] overflow-y-auto m-4 py-2 lg:max-h-none lg:overflow-y-visible"
            >
                <>
                    <ProfileSuccessModal />
                    <Button className="h-[48px] w-[100%] !bg-[#29397E] text-[16px] font-medium leading-[24px] !text-[#FDFDFE] mt-[32px]" onClick={toggle}>
                        Verify
                    </Button>
                </>
            </ModalDialog> */}
    </>
  )
}

export default AccountDetails
