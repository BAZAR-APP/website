const SavingSection = () => {
    return (
        <div className="main-container flex flex-col items-center gap-24 px-5 py-24 mx-auto max-w-[1200px] bg-white">
            <div className="flex flex-col md:flex-row gap-12 items-center w-full">
                {/* Image container */}
                <div className="flex justify-center items-center shrink-0 bg-[#f3f4f6] rounded-[137px] p-8 md:p-9 w-[220px] h-[220px] md:w-[274px] md:h-[274px]">
                    <div
                        className="w-[140px] h-[140px] md:w-[171px] md:h-[171px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-03/ce2kJLDrws.png)] bg-cover bg-no-repeat"
                        role="img"
                        aria-label="Diamond exclusive savings image"
                    />
                </div>

                {/* Text container */}
                <div className="flex flex-col gap-6 flex-grow max-w-[960px]">
                    <h2 className="font-['Inter'] text-black font-semibold text-2xl sm:text-3xl leading-[1.2] whitespace-normal">
                        Diamond Exclusive: Boost Your Savings!
                    </h2>
                    <p className="font-['Inter'] text-[#484a4c] text-base sm:text-lg leading-[1.3]">
                        Activate your discount booster and enjoy up to 20% off future chalet bookings — only for Diamond tier members.
                    </p>
                    <button
                        className="bg-[#29397e] text-white font-['Inter'] font-medium text-base leading-6 rounded-md py-3 px-5 w-max hover:bg-[#3f4faa] transition-colors"
                        type="button"
                    >
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavingSection;
