"use client"

import CommonButton from "@/components/Button/Button";
import OneTimePassword from "@/components/OTPInput";

const VerifyAccount = () => {
    const handleOtpChange = () => {

    }
    return (
        <>
            <div className='flex flex-col items-center justify-center h-[100%]'>
                <div className='max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]'>
                    <img src={"/images/Logo.svg"} alt='' className='w-[150px] h-[48px]' />
                    <div className='flex flex-col gap-[12px]'>
                        <h2 className='!text-primary font-600 text-[39px]'>Verify Your<br /> Account</h2>
                        <p className='!text-secondary font-600 text-[16px]'>Enter the 5-digit code sent to your phone to complete verification.</p>
                    </div>
                    <OneTimePassword className="flex gap-[8px]" onChange={handleOtpChange} />
                    <div className="flex justify-between">
                        <div className="text-[#484A4C] font-normal">Didn’t Receive a Code? <span className="text-[#29397E] font-bold">Resend</span></div>

                        <div className="text-[#29397E] font-bold">
                            01:50
                        </div>
                    </div>
                    <CommonButton children={"Verify"} icon={undefined} className='bg-[#F3F4F6] text-[#1F2A37] rounded-2 px-2 py-4' />
                    <div className="flex items-center space-x-1 text-[14px]">
                        <span className="text-[#484A4C]">Already have an account?</span>
                        <a href="/login" className="text-[#29397E] font-bold">Log in</a>
                    </div>
                </div>
            </div >
        </>
    );

}

export default VerifyAccount;