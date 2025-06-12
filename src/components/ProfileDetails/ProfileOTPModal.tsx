"use client"
import { useState } from "react";
import OneTimePassword from "../OTPInput";

const ProfileOTPModal = () => {
    const [otp, setOtp] = useState('')

    return (
        <>


            <div className="flex justify-center items-start self-stretch px-4 py-0">
                <div className="w-[161px] h-[161px] relative">
                    <div className="w-[161px] h-[161px] absolute bg-gray-50 rounded-[20.125px] left-0 top-0" />
                    <svg
                        width="119"
                        height="119"
                        viewBox="0 0 119 119"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-[22px] top-[22px]"
                        aria-label="Verification approved"
                    >
                        <path
                            d="M59.5 105.364C61.5538 105.364 63.2188 103.699 63.2188 101.646C63.2188 99.5917 61.5538 97.9268 59.5 97.9268C57.4462 97.9268 55.7812 99.5917 55.7812 101.646C55.7812 103.699 57.4462 105.364 59.5 105.364Z"
                            fill="#29397E"
                        />
                        <path
                            d="M54.5417 19.8333H64.4583C65.1158 19.8333 65.7464 19.5721 66.2114 19.1072C66.6763 18.6423 66.9375 18.0117 66.9375 17.3542C66.9375 16.6967 66.6763 16.0661 66.2114 15.6011C65.7464 15.1362 65.1158 14.875 64.4583 14.875H54.5417C53.8842 14.875 53.2536 15.1362 52.7886 15.6011C52.3237 16.0661 52.0625 16.6967 52.0625 17.3542C52.0625 18.0117 52.3237 18.6423 52.7886 19.1072C53.2536 19.5721 53.8842 19.8333 54.5417 19.8333Z"
                            fill="#29397E"
                        />
                        <path
                            d="M84.2943 4.95801H34.7109C30.6104 4.95801 27.2734 8.29497 27.2734 12.3955V106.604C27.2734 110.704 30.6104 114.041 34.7109 114.041H84.2943C88.3948 114.041 91.7318 110.704 91.7318 106.604V12.3955C91.7318 8.29497 88.3948 4.95801 84.2943 4.95801ZM32.2318 29.7497H86.7734V89.2497H32.2318V29.7497ZM34.7109 9.91634H84.2943C85.6603 9.91634 86.7734 11.0295 86.7734 12.3955V24.7913H32.2318V12.3955C32.2318 11.0295 33.3449 9.91634 34.7109 9.91634ZM86.7734 106.604C86.7734 107.97 85.6603 109.083 84.2943 109.083H34.7109C33.3449 109.083 32.2318 107.97 32.2318 106.604V94.208H86.7734V106.604Z"
                            fill="#29397E"
                        />
                        <path
                            d="M59.4974 39.667C48.5618 39.667 39.6641 48.5647 39.6641 59.5003C39.6641 70.4359 48.5618 79.3337 59.4974 79.3337C70.433 79.3337 79.3307 70.4359 79.3307 59.5003C79.3307 48.5647 70.433 39.667 59.4974 39.667ZM59.4974 74.3753C51.2938 74.3753 44.6224 67.7039 44.6224 59.5003C44.6224 51.2968 51.2938 44.6253 59.4974 44.6253C67.701 44.6253 74.3724 51.2968 74.3724 59.5003C74.3724 67.7039 67.701 74.3753 59.4974 74.3753Z"
                            fill="#29397E"
                        />
                        <path
                            d="M65.1791 52.7963L57.0351 60.9379L53.8097 57.7125C53.3448 57.2477 52.7143 56.9865 52.0569 56.9865C51.3995 56.9865 50.769 57.2477 50.3041 57.7125C49.8393 58.1774 49.5781 58.8079 49.5781 59.4653C49.5781 60.1227 49.8393 60.7532 50.3041 61.2181L55.2823 66.1962C55.512 66.4273 55.7851 66.6106 56.0859 66.7357C56.3867 66.8608 56.7093 66.9252 57.0351 66.9252C57.3609 66.9252 57.6834 66.8608 57.9842 66.7357C58.285 66.6106 58.5582 66.4273 58.7879 66.1962L68.6847 56.3019C68.9149 56.0717 68.0975 55.7984 69.222 55.4977C69.3466 55.197 69.4107 54.8746 69.4107 54.5491C69.4107 54.2236 69.3466 53.9013 69.222 53.6005C69.0975 53.2998 68.9149 53.0265 68.6847 52.7963C68.4545 52.5662 68.1813 52.3836 67.8805 52.259C67.5798 52.1344 67.2574 52.0703 66.9319 52.0703C66.6064 52.0703 66.2841 52.1344 65.9833 52.259C65.6826 52.3836 65.4093 52.5662 65.1791 52.7963Z"
                            fill="#29397E"
                        />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-start gap-8 self-stretch">
                <header className="flex flex-col items-center gap-6 self-stretch">
                    <div className="flex flex-col items-start gap-3 self-stretch">
                        <h2
                            id="verification-title"
                            className="self-stretch text-[#19191A] text-[25px] font-bold leading-8 max-md:text-[22px] max-md:leading-7 max-sm:text-xl max-sm:leading-[26px]"
                        >
                            Verify Your New Phone Number
                        </h2>
                        <p className="self-stretch text-[#484A4C] text-base font-normal max-md:text-[15px] max-sm:text-sm">
                            Enter the 5-digit code sent to your phone to complete verification.
                        </p>
                    </div>
                </header>
                <OneTimePassword className="flex gap-[8px]" onChange={setOtp} />
                <div className="main-container flex w-[438px] justify-between items-start flex-nowrap relative mx-auto my-0">
                    <div className="flex gap-[4px] items-start grow shrink-0 basis-0 flex-nowrap relative">
                        <span className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#484a4c] relative text-left whitespace-nowrap z-[1]">
                            Didn’t Receive a Code ?{" "}
                        </span>
                        <div className="flex w-[52px] gap-[6px] justify-center items-center shrink-0 flex-nowrap relative overflow-hidden z-[2]">
                            <span className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[14px] font-bold leading-[16.943px] text-[#29397e] relative text-left whitespace-nowrap z-[3]">
                                Resend
                            </span>
                        </div>
                    </div>
                    <div className="flex w-[37px] gap-[4px] items-start shrink-0 flex-nowrap relative z-[4]">
                        <span className="h-[17px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#29397e] relative text-left whitespace-nowrap z-[5]">
                            01:20
                        </span>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ProfileOTPModal