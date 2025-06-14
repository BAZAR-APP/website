import { DownloadApp, EarningPoints, HowItWork, JoinUs, LoyaltyBannerSection, LoyaltyTiers, SavingSection } from "@/components"

const LoyaltyProgram = () => {
    return (
        <div className="max-w-xxl">
            <LoyaltyBannerSection />
            <HowItWork />
            <LoyaltyTiers />
            <JoinUs />
            <EarningPoints />
            <SavingSection />
            <DownloadApp />
        </div>
    );
}

export default LoyaltyProgram