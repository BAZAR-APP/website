"use client"
import CommonButton from "@/components/Button/Button"
import { CheckBox, CommonInput } from "@/components"

const ForgetPasswordVerify = () => {

    const handleChange = () => { }

    return (

        <div className='flex flex-col items-center justify-center h-[100%]'>
            <div className='max-w-[360px] flex flex-col gap-[24px] pt-[120px]'>
                <img src={"/images/Logo.svg"} alt='' className='w-[150px] h-[48px]' />
                <div className='flex flex-col gap-[12px]'>
                    <h2 className='!text-primary font-semibold text-[39px]'>Forget Password</h2>
                    <p className='text-secondary font-400 text-[16px]'>Enter your phone number to reset your password.</p>
                </div>
                <CommonInput icon={<img src={"/images/countryFlag.svg"} alt='' className='w-[16px] h-[16px]' />} prefix='+965' name="phone" className={'!bg-[#F9FAFB] !text-[#484A4C] !rounded-[8px] !border-none !h-[42px]'} placeholder='Enter your phone number' type='number' label='Phone' onChange={handleChange} />
                <CommonButton children={"Send OTP"} className="w-[360px] h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg" />
            </div>
        </div>
    );
}

export default ForgetPasswordVerify;