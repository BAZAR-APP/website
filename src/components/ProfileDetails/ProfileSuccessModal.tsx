const ProfileSuccessModal = () => {
    return (
        <>

            <div className="flex pt-0 pr-[16px] pb-0 pl-[16px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
                <div className="w-[170px] h-[170px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-11/o2tojhfzDj.png)] bg-cover bg-no-repeat relative overflow-hidden z-[3]" />
            </div>

            <div className="flex pt-0 pr-[16px] pb-0 pl-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
                <div className="flex flex-col gap-[32px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap relative z-[5]">
                    <div className="flex flex-col gap-[16px] justify-center items-center self-stretch shrink-0 flex-nowrap relative z-[6]">
                        <span className="h-[32px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-semibold leading-[32px] text-[#19191a] relative text-center whitespace-nowrap z-[7]">
                            Email Update in Progress
                        </span>
                        <div className="flex flex-col gap-[4px] items-start self-stretch shrink-0 flex-nowrap relative z-[8]">
                            <span className="flex w-[444px] h-[72px] justify-center items-start self-stretch shrink-0 font-['Inter'] text-[20px] font-normal leading-[24.205px] text-[#484a4c] relative text-center z-[9]">
                                We’ve sent a confirmation link to your new email. Please check
                                your inbox to verify the change.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSuccessModal