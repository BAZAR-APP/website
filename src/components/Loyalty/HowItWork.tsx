import React from "react";
import Image from "next/image";

const steps = [
    {
        img: '/images/BookChalet.svg',
        title: "Book Your Chalet",
        description: "Choose and reserve your perfect chalet through our website or app.",
    },
    {
        img: '/images/EarnPoints.svg',
        title: "Stay and Earn Points",
        description: "Enjoy your stay — points are automatically added after checkout.",
    },
    {
        img: '/images/RedeemPoints.svg',
        title: "Redeem Your Points",
        description: "Use your points for discounts, upgrades, or special perks on future bookings.",
    },
    {
        img: '/images/UnlockBenefits.svg',
        title: "Unlock Benefits",
        description: "The more you stay, the more VIP rewards and offers you unlock.",
    },
];

const StepCard: React.FC<{ title: string; description: string; img: string }> = ({ title, description, img }) => (
    <div className="flex flex-col w-full sm:max-w-[268px] items-start bg-[#F9FAFB33] rounded-2xl p-4 gap-3 sm:gap-4">
        <div className="flex flex-col items-start gap-3 sm:gap-4">
            <div className="flex w-14 h-14 sm:w-16 sm:h-16 items-center justify-center bg-gray-100 rounded-[32px]">
                <Image alt={title} src={img} width={40} height={40} className="w-10 h-10 sm:w-10 sm:h-10" />
            </div>
            <div className="flex flex-col">
                <h3 className="font-medium text-cream-white text-lg sm:text-[20px] leading-tight">
                    {title}
                </h3>
            </div>
        </div>
        <p className="font-normal text-cream-white text-sm sm:text-[14px] leading-snug">
            {description}
        </p>
    </div>
);

const HowItWork: React.FC = () => {
    return (
        <div className="flex flex-col items-center px-4 sm:px-16 py-12 sm:py-24 relative bg-primary-blue mt-16">
            <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 w-full">
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12 w-full">
                    <div className="flex flex-col items-start gap-3 md:gap-8 flex-1">
                        <h2 className="font-semibold text-white text-[32px] sm:text-3xl md:text-[39px] leading-tight">
                            How It Works
                        </h2>
                        <p className="text-base sm:text-lg md:text-[20px] text-cream-white w-full md:max-w-[700px] text-left">
                            Earn points with every booking, track your balance, redeem for discounts, and unlock exclusive perks!
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start w-full gap-4 sm:gap-6">
                    {steps.map((step, index) => (
                        <StepCard key={index} img={step.img} title={step.title} description={step.description} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWork;
