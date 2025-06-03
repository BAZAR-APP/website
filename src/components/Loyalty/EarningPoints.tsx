const EarningPoints = () => {
    return (
        <div className="main-container flex flex-col items-center mx-auto my-0 w-full max-w-[1440px] pt-[96px] px-[80px] bg-[#fff] relative">
            <div className="flex gap-[48px] items-center w-full">
                <div className="flex flex-col gap-[24px] items-start">
                    <h2 className="font-['Inter'] text-[39px] font-semibold leading-[47px] text-[#000]">
                        Start Earning Points
                    </h2>
                    <p className="w-[492px] font-['Inter'] text-[20px] font-normal leading-[24.205px] text-[#484a4c]">
                        Earn points every time you book or leave a review—unlock rewards and exclusive discounts!
                    </p>
                    <button className="flex justify-center items-center w-[190px] p-[12px] bg-[#29397e] rounded-[8px] text-[#fff] font-['Inter'] font-medium text-[16px]">
                        Register Now
                    </button>
                </div>

                <div className="relative w-[740px] h-[266.239px]">
                    <div className="absolute top-0 left-[58.87%] w-[41.13%] h-full bg-[rgba(41,57,126,0.08)] rounded-[13.175px] z-10" />
                    <div className="absolute top-[7.8%] left-[28.55%] w-[39.84%] h-[90.41%] bg-[#29397e] rounded-[13.175px] rotate-[-16.84deg] z-7">
                        <div className="relative w-[138.911px] h-[84.573px] mt-[77.59px] ml-[78.313px] overflow-hidden z-8">
                            <div className="relative w-[132.16px] h-[62.148px] bg-[length:100%_100%] bg-no-repeat z-9" />
                        </div>
                    </div>
                    <div className="absolute top-[7.8%] left-0 w-[36.6%] h-[73.42%] bg-[rgba(41,57,126,0.08)] rounded-[13.174px] z-11" />
                </div>
            </div>
        </div>
    );
};

export default EarningPoints;