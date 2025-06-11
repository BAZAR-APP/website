"use client"
import Image from "next/image"
import CommonInput from "../CommonInput/Input"
import ModalDialog from "../ModalDialog/Dialog"
import ReferModal from "./ReferModal"
import useToggle from "@/lib/hooks/useToggle"

import Button from "../Button/Button"
import ProfileOTPModal from "./ProfileOTPModal"
// import ProfileSuccessModal from "./ProfileSuccessModal"
// import ProfileOTPModal from "./ProfileOTPModal"

const AccountDetails = () => {
    const { isOpen, toggle } = useToggle(false)




    const handlePhoneChange = () => {

    }

    const handleSubmit = () => {

    }
    return (
        <>


            <div className="flex w-[710px] flex-col gap-[40px] items-start shrink-0 flex-nowrap relative z-[38]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">

                    <CommonInput
                        name=""
                        placeholder=""
                        label="Full Name"
                        className={'bg-[#F9FAFB] text-[#484A4C] rounded-[8px]'}
                    />
                    <CommonInput
                        icon={
                            <Image src={'/images/countryFlag.svg'} alt="Country Flag" width={16} height={16} />
                        }
                        prefix="+965"
                        name="phone"
                        className={
                            '!bg-[#F9FAFB] !w-full !text-[#484A4C] !rounded-[8px] !border-none !h-[42px] text-sm sm:text-base'
                        }
                        type="text"
                        label="Phone"
                        maxLength={8}
                        onChange={handlePhoneChange}
                    />
                    <CommonInput
                        name=""
                        placeholder=""
                        label="Email"
                        type="email"
                        className={'bg-[#F9FAFB] text-[#484A4C] rounded-[8px]'}
                    />


                </form >

                <div className="flex w-[330px] h-[117px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[52]">
                    <span className="h-[17px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#19191a] relative text-left overflow-hidden whitespace-nowrap z-[53]">
                        Home or ID Address
                    </span>
                    <div className="flex w-[330px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#f9fafb] rounded-[8px] relative overflow-hidden z-[54]">
                        <span className="flex w-[298px] justify-start items-start self-stretch grow shrink-0 basis-0 font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#484a4c] relative text-left overflow-hidden z-[55]">
                            Sea Villa Retreat, Block 5, Street 12, Villa 27, Al Khiran,
                            Ahmadi, Kuwait 64021
                        </span>
                    </div>
                </div>
            </div >
            <div className="flex flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[56]">
                <div className="flex pt-[8px] pr-0 pb-[8px] pl-0 gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative z-[57]">
                    <div className="flex w-[190px] pt-[12px] pr-[20px] pb-[12px] pl-[20px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#29397e] rounded-[8px] relative overflow-hidden z-[58]">
                        <Button className="h-[24px]  text-[16px] font-medium  text-[#fff] " onClick={toggle}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
            <ModalDialog
                title={'Refere A Friend'}
                isOpen={isOpen}
                setIsOpen={toggle}
                className="!max-w-[486px] w-full max-h-[calc(100vh-80px)] overflow-y-auto m-4 py-2 lg:max-h-none lg:overflow-y-visible"
            >
                <ReferModal />
                <Button className="h-[48px] w-[100%] !bg-[#F3F4F6] text-[16px] font-medium leading-[24px] !text-[#1F2A37] mt-[32px]" onClick={toggle}>
                    Save Changes
                </Button>
            </ModalDialog>
            {/* <ModalDialog
                title={''}
                isOpen={isOpen}
                setIsOpen={toggle}
                className="!max-w-[486px] w-full max-h-[calc(100vh-80px)] overflow-y-auto m-4 py-2 lg:max-h-none lg:overflow-y-visible"
            >
                <>
                    <ProfileOTPModal />
                    <Button className="h-[48px] w-[100%] !bg-[#29397E] text-[16px] font-medium leading-[24px] !text-[#FDFDFE] mt-[32px]" onClick={toggle}>
                        Verify
                    </Button>
                </>
            </ModalDialog> */}

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