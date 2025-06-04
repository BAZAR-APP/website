import { BazarImageCard } from "@/components";

const LoyaltyBannerSection = () => {
    return (
        <div className="flex flex-col items-center relative bg-color-tokens-background-background-primary">
            <div className="flex flex-col items-center justify-center gap-16 px-4 py-16 md:py-[92px] w-full">
                <div className="flex flex-col w-full max-w-screen-xl items-start justify-center gap-10 px-4 md:px-0">
                    <div className="flex flex-col items-start gap-8 w-full">
                        <div className="flex flex-col items-start gap-6 w-full">
                            <div className="flex flex-col items-start gap-4 w-full">
                                <p className="mt-[-1px] font-bold text-primary leading-tight text-[#29397e] text-4xl sm:text-5xl md:text-[92px] tracking-tight">
                                    <span className="block">
                                        About
                                    </span>
                                    <span className="block text-[#19191a]">
                                        Loyalty Program
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-6 w-full">
                            <p className="mt-[-1px] text-base sm:text-lg md:text-[20px] max-w-full md:max-w-[700px] text-color-tokens-text-text-secondary text-justify font-normal leading-relaxed">
                                Join our loyalty program and make every booking more rewarding!
                                Earn points every time you book a chalet or purchase add-ons.
                                The more you book, the more points you collect, unlocking bigger
                                savings and exclusive perks.
                            </p>
                        </div>
                    </div>
                    <BazarImageCard />
                </div>
            </div>
        </div>
    );
};

export default LoyaltyBannerSection;
