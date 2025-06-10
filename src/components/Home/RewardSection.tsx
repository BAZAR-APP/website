
import * as React from "react";
import { BazarImageCard, Button } from "@/components";

interface RewardsSectionProps {
    title?: string;
    description?: string;
    buttonText?: string;
    imageUrl?: string;
    onButtonClick?: () => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({
    title = "Earn & Redeem Rewards",
    description = "Join our loyalty program, earn points on every booking, and redeem them for exclusive discounts!",
    buttonText = "Learn More",
    imageUrl = "https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/9b3cf1b0d5de8b6159f2435165d5be9d9e71c766?placeholderIfAbsent=true",
    onButtonClick
}) => {
    const handleLearnMore = () => {
        if (onButtonClick) {
            onButtonClick();
        } else {
            console.log("Learn more about rewards program");
        }
    };

    return (
        <section
            className="flex flex-col justify-center bg-white md:px-16 md:py-24 max-md:px-5  mx-auto"
            aria-labelledby="rewards-title"
        >
            <div className="min-h-[794px] overflow-hidden bg-gray-50 p-20 rounded-[40px] max-md:px-5  mx-auto max-w-screen-xl">
                <article className="min-h-[191px] max-w-[1280px]">
                    <header>
                        <h1 className="text-[#19191A] text-[32px] md:text-[39px] font-semibold leading-tight max-md:max-w-full">
                            {title}
                        </h1>
                    </header>

                    <p className="text-[#484A4C] text-xl font-normal mt-6 leading-relaxed max-w-full md:max-w-lg">
                        {description}
                    </p>

                    <div className="mt-6">
                        <Button
                            className="w-[190px] h-auto bg-[#29397E] text-white hover:bg-[#1f2a5f] rounded-lg font-medium"
                        >
                            {buttonText}
                        </Button>
                    </div>
                </article>

                <div className="mt-10">
                    <BazarImageCard />
                </div>
            </div>
        </section>
    );
};

export default RewardsSection