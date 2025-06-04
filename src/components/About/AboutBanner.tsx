
const AboutBanner = () => {
    return (
        <div className="main-container flex w-[1440px] flex-col items-center flex-nowrap bg-[#fdfdfe] relative overflow-hidden mx-auto my-0">
            <div className="flex pt-[92px] pr-0 pb-[92px] pl-0 flex-col gap-[64px] justify-center items-center self-stretch shrink-0 flex-nowrap relative overflow-hidden">
                <div className="flex gap-[64px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
                    <div className="flex w-[515px] flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
                        <div className="w-[515px] h-[348px] shrink-0 bg-[rgba(255,239,239,0.2)] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-03/8zZYxSnp32.png)] bg-cover bg-no-repeat rounded-[30px] relative overflow-hidden z-[3]" />
                    </div>
                    <div className="flex flex-col gap-[32px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[4]">
                        <div className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]">
                            <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[6]">
                                <div className="w-[701px] self-stretch shrink-0 font-['Urbanist'] text-[92px] font-semibold leading-[110.4px] tracking-[-1.84px] relative text-left whitespace-nowrap z-[7]">
                                    <span className="font-['Inter'] text-[92px] font-bold leading-[110.4px] text-[#29397e] tracking-[-1.84px] relative text-left">
                                        About <br />
                                    </span>
                                    <span className="font-['Inter'] text-[92px] font-bold leading-[110.4px] text-[#19191a] tracking-[-1.84px] relative text-left">
                                        Bazar
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[24px] items-start self-stretch shrink-0 flex-nowrap relative z-[8]">
                            <span className="flex w-[700px] h-[120px] items-start shrink-0 font-['Inter'] text-[20px] font-normal leading-[24.205px] text-[#484a4c] relative z-[9]">
                                Bazar offers a luxurious yet peaceful stay with breathtaking
                                views of the sea, private outdoor spaces, and elegant interiors.
                                Whether you're looking for a romantic retreat, a family getaway,
                                or a relaxing weekend with friends, our spaces are crafted to
                                create unforgettable moments by the water.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutBanner