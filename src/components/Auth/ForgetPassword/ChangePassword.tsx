"use client"
import CommonButton from "@/components/Button/Button"
import { CommonInput } from "@/components"

const ChangePassword
    = () => {

        const handleChange = () => { }

        return (

            <div className='flex flex-col items-center justify-center h-[100%]'>
                <div className='max-w-[360px] flex flex-col gap-[24px] pt-[120px]'>
                    <img src={"/images/Logo.svg"} alt='' className='w-[150px] h-[48px]' />
                    <div className='flex flex-col gap-[12px]'>
                        <h2 className='!text-primary font-semibold text-[39px]'>Set A New Password</h2>
                        <p className='text-secondary font-400 text-[16px]'>Create a strong password to secure your account.</p>
                    </div>
                    <CommonInput name="password" className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'} type='password' label='New Password' onChange={handleChange} />
                    <CommonInput name="new-password" className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'} type='password' label='Confirm New Password' onChange={handleChange} />
                    <CommonButton children={"Create New Password"} className="w-[360px] h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg" />
                </div>
            </div>
        );
    }

export default ChangePassword
    ;