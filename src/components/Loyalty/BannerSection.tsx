import { BazarImageCard } from "@/components"

const LoyaltyBannerSection = () => {
    return (
        <div className="flex flex-col items-center relative bg-color-tokens-background-background-primary">
            <div className="flex flex-col items-center justify-center gap-16 px-0 py-[92px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col max-w-screen-xl items-start justify-center gap-[42px] relative w-full flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                                <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-primary text-[92px] tracking-[-1.84px] leading-[normal]">
                                    <span className="text-[#29397e] tracking-[-1.69px]">
                                        About <br />
                                    </span>

                                    <span className="text-[#19191a] tracking-[-1.69px]">
                                        Loyalty Program
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
                            <p className="relative w-[700px] mt-[-1.00px] font-inter-20px-regular font-[number:var(--inter-20px-regular-font-weight)] text-color-tokens-text-text-secondary text-[length:var(--inter-20px-regular-font-size)] text-justify tracking-[var(--inter-20px-regular-letter-spacing)] leading-[var(--inter-20px-regular-line-height)] [font-style:var(--inter-20px-regular-font-style)]">
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

export default LoyaltyBannerSection