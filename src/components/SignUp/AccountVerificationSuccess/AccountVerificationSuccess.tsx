"use client"

import CommonButton from "@/components/Button/Button";

const AccountVerificationSuccess = () => {
    const handleOtpChange = () => {

    }
    return (
        <>
            <div className='flex flex-col items-center justify-center h-[100%]'>
                <div className='max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]'>
                    <img src={"/images/Logo.svg"} alt='' className='w-[150px] h-[48px]' />
                    <div className='flex flex-col gap-[12px]'>
                        <h2 className='!text-primary font-600 text-[39px]'>Verified Successfully</h2>
                        <p className='!text-secondary font-600 text-[16px]'>Your phone number has been verified. You’re all set to continue!</p>
                    </div>
                    <CommonButton children={"Continue"} icon={undefined} className='bg-[#29397E] text-red rounded-2 px-2 py-4' />

                </div>
            </div >
        </>
    );

}

export default AccountVerificationSuccess;