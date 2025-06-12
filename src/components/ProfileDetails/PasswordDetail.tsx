import { useForm } from 'react-hook-form'
import Button from '../Button/Button'
import CommonInput from '../CommonInput/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '@/lib/validationSchemas'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import api from '@/lib/axios'
interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

const PasswordDetail = () => {
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: PasswordFormData) => {
      await api.patch('/users/resetUserPassword', {
        oldPassword: data?.currentPassword,
        newPassword: data?.newPassword,
        confirmNewPassword: data?.confirmNewPassword,
      })
    },
    onSuccess: () => {
      toast.success('Password updated successfully')
    },
    onError: (error: any) => {
      toast.error(extractErrorMessage(error))
    },
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValue(name as keyof PasswordFormData, value, { shouldValidate: true })
  }

  const onSubmit = (data: PasswordFormData) => {
    mutation.mutate(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[32px]">
        <div>
          <CommonInput
            name="currentPassword"
            label="Old Password"
            className={'bg-[#F9FAFB]'}
            value={watch('currentPassword')}
            onChange={handlePasswordChange}
            error={!!errors?.currentPassword}
            errorMessage={errors?.currentPassword?.message}
          />
        </div>
        <div>
          <CommonInput
            name="newPassword"
            label="New Password"
            className={'bg-[#F9FAFB]'}
            value={watch('newPassword')}
            onChange={handlePasswordChange}
            error={!!errors?.newPassword}
            errorMessage={errors?.newPassword?.message}
          />
        </div>
        <div>
          <CommonInput
            name="confirmNewPassword"
            label="Confirm New Password"
            className={'bg-[#F9FAFB]'}
            value={watch('confirmNewPassword')}
            onChange={handlePasswordChange}
            error={!!errors?.confirmNewPassword}
            errorMessage={errors?.confirmNewPassword?.message}
          />
        </div>
        <div className="flex gap-4 mt-8">
          <Button
            className="w-full h-[48px] !bg-[#F3F4F6] !text-[#1F2A37] gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base disabled:opacity-50 whitespace-nowrap"
            onClick={() => router.push('/reset-password')}
          >
            Forget Password
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base disabled:opacity-50"
          >
            Save Password
          </Button>
        </div>
      </form>
    </>
  )
}

export default PasswordDetail
