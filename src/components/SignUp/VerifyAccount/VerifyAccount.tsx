"use client"

const VerifyAccount = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center h-[100%]'>
                <div className='max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]'>
                    <img src={"/images/Logo.svg"} alt='' className='w-[150px] h-[48px]' />
                    <div className='flex flex-col gap-[12px]'>
                        <h2 className='!text-primary font-600 text-[39px]'>Sign Up</h2>
                        <p className='!text-secondary font-600 text-[16px]'>Welcome back! Log in to manage your bookings and profile.</p>
                    </div>
                    <CommonInput name="" placeholder='' type='number' label='Full Name' className={''} onChange={handleChange} />
                    <CommonInput name="" placeholder='' type='number' label='Phone' className={'bg-[#F9FAFB]'} onChange={handleChange} />
                    <CommonInput name="" placeholder='' type='number' label='Password' className={'bg-[#F9FAFB]'} onChange={handleChange} />
                    <CheckboxLabel label={"Remember Me"} />
                    <CommonButton children={undefined} icon={undefined} className='bg-[#29397e]' />
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-[#DEDEDF]"></div>
                        <span className="mx-2 text-[#DEDEDF] text-sm">OR</span>
                        <div className="flex-grow border-t border-[#DEDEDF]"></div>
                    </div>
                    <div className='flex justify-center items-center gap-4 w-full'>
                        <img src={"/images/googleRounded.svg"} alt='' className='shrink-0' />
                        <img src={"/images/appleRounded.svg"} alt='' className='shrink-0' />
                    </div>
                    <div className="flex items-center space-x-1 text-[14px]">
                        <span className="text-[#484A4C]">Already have an account?</span>
                        <a href="/login" className="text-[#29397E] font-bold">Log in</a>
                    </div>
                </div>
            </div>
        </>
    );

}

export default VerifyAccount;