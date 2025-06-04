const EarningPoints = () => {
    return (
        <div className="main-container flex flex-col items-center mx-auto my-0 w-full max-w-[1440px] pt-24 px-5 bg-white relative">
            <div className="flex flex-col md:flex-row gap-12 md:gap-12 items-start w-full max-w-[960px]">
                {/* Text Section */}
                <div className="flex flex-col gap-6 items-start flex-1">
                    <h2 className="font-['Inter'] text-3xl md:text-4xl font-semibold leading-tight text-black">
                        Start Earning Points
                    </h2>
                    <p className="w-full md:w-[492px] font-['Inter'] text-base md:text-lg font-normal leading-relaxed text-[#484a4c]">
                        Earn points every time you book or leave a review—unlock rewards and exclusive discounts!
                    </p>
                    <button className="flex justify-center items-center w-[190px] p-3 bg-[#29397e] rounded-lg text-white font-['Inter'] font-medium text-base hover:bg-[#3f4faa] transition-colors">
                        Register Now
                    </button>
                </div>

                {/* Image Section (replaced previous complex divs with image) */}
                <div className="flex justify-center items-center flex-1 max-w-full">
                    <img
                        src="/images/bazarGroup.svg"
                        alt="Earning points illustration"
                        className="w-full max-w-[400px] h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default EarningPoints;
