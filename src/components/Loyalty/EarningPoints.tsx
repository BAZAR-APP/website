import Image from "next/image";

const EarningPoints = () => {
    return (
        <div className="main-container flex flex-col items-center w-full max-w-screen-xl pt-16 md:pt-24 mt-10 md:mt-16 px-4 md:px-5 bg-white relative mx-auto">
            <div className="flex flex-col md:flex-row gap-12 md:gap-12 items-start w-full">

                <div className="flex flex-col gap-6 items-start flex-1">
                    <h2 className=" text-3xl md:text-4xl font-semibold leading-tight text-black">
                        Start Earning Points
                    </h2>
                    <p className="w-full md:w-[492px] text-base md:text-lg font-normal leading-relaxed text-[#484a4c]">
                        Earn points every time you book or leave a review—unlock rewards and exclusive discounts!
                    </p>
                    <button className="flex justify-center items-center w-[190px] p-3 bg-[#29397e] rounded-lg text-white  font-medium text-base hover:bg-[#3f4faa] transition-colors">
                        Register Now
                    </button>
                </div>

                <div className="flex justify-center items-center flex-1 max-w-full">
                    <Image
                        src="/images/bazarGroup.svg"
                        alt="Earning points illustration"
                        className="w-full h-auto object-contain"
                        height={100}
                        width={100}
                    />
                </div>
            </div>
        </div>
    );
};

export default EarningPoints;
