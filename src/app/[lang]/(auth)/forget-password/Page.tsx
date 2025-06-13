'use client'

import { useForm } from 'react-hook-form'
import CommonButton from '@/components/Button/Button'
import { CommonInput } from '@/components'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneSchema } from '@/lib/validationSchemas'
import { z } from 'zod'
type FormValues = {
  phone: string
}
interface PhoneChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const ForgetPassword = () => {
  const router = useRouter()

  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(
      z.object({
        phone: phoneSchema,
      }),
    ),
    defaultValues: {
      phone: '',
    },
  })
  const phone = watch('phone')
  const handlePhoneChange = (e: PhoneChangeEvent): void => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8)
    setValue('phone', value, { shouldValidate: true })
  }

  const resendMutation = useMutation({
    mutationFn: async (data: FormValues) =>
      api.post('/auth/forgetPassword', {
        phoneNumber: data.phone,
        callingCode: '+965',
      }),
    onSuccess: (res) => {
      toast.success('OTP sent successfully')
      router.push(`/verify-account?userId=${encodeURIComponent(res?.data?.userId)}&phone=${phone}&mode=reset-password`)
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error))
    },
  })

  const onSubmit = (data: FormValues) => {
    resendMutation.mutate(data)
  }

  return (
    <div className="flex flex-col items-center justify-center h-[100%]">
      <div className="max-w-[360px] flex flex-col justify-center gap-[24px]">
        <Image src={'/images/Logo.svg'} alt="Logo" width={150} height={48} />
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary font-semibold text-[24px] max-[1440px]:text-[32px] min-[1441px]:text-[39px] leading-tight">
            Forget Password
          </h2>
          <p className="text-secondary font-400 text-[16px] min-[1440px]:pt-3">
            Enter your phone number to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
          <CommonInput
            icon={<img src="/images/countryFlag.svg" alt="" className="w-[16px] h-[16px]" />}
            prefix="+965"
            type="number"
            label="Phone"
            name="phone"
            className="!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]"
            value={watch('phone')}
            onChange={handlePhoneChange}
            error={!!errors?.phone}
            errorMessage={errors?.phone?.message}
          />

          <CommonButton
            type="submit"
            className="w-full h-[48px] bg-[#29397E] min-[1440px]:my-3 text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg"
            disabled={!isValid || resendMutation?.isPending}
          >
            {resendMutation.isPending ? 'Sending...' : 'Send OTP'}
          </CommonButton>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
