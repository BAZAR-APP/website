'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import CommonButton from '@/components/Button/Button'
import { CommonInput } from '@/components'
import { resetPasswordSchema } from '@/lib/validationSchemas'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'

interface PasswordFormData {
  password: string
  confirmPassword: string
}

const ChangePassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams?.get('token')
  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue(name as keyof PasswordFormData, value, { shouldValidate: true })
  }

  const mutation = useMutation({
    mutationFn: async (data: PasswordFormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/resetPassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: data.password, confirmPassword: data?.confirmPassword }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Something went wrong')
      }

      return res.json()
    },
    onSuccess: () => {
      router.push('/verify-account/success?mode=reset-password')
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error))
    },
  })

  const onSubmit = (data: PasswordFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]"
      >
        <img src="/images/Logo.svg" alt="" className="w-[150px] h-[48px]" />

        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary font-semibold text-[24px] max-[1440px]:text-[32px] min-[1441px]:text-[39px] leading-tight">
            Set A New Password
          </h2>
          <p className="text-secondary font-400 text-[16px]">
            Create a strong password to secure your account.
          </p>
        </div>

        <CommonInput
          name="password"
          type="password"
          label="New Password"
          className="!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]"
          value={watch('password')}
          onChange={handlePasswordChange}
          error={!!errors?.password}
          errorMessage={errors?.password?.message}
        />

        <CommonInput
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          className="!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]"
          value={watch('confirmPassword')}
          onChange={handlePasswordChange}
          error={!!errors?.confirmPassword}
          errorMessage={errors?.confirmPassword?.message}
        />

        <CommonButton
          type="submit"
          className="w-full h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg"
          disabled={!isValid || mutation?.isPending}
        >
          {mutation.isPending ? 'Submitting...' : 'Create New Password'}
        </CommonButton>
      </form>
    </div>
  )
}

export default ChangePassword
