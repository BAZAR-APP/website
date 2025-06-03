import React from "react";
import Image from "next/image";

const steps = [
    {
        img: '',
        title: "Book Your Chalet",
        description: "Choose and reserve your perfect chalet through our website or app.",

    },
    {
        img: '',
        title: "Stay and Earn Points",
        description: "Enjoy your stay — points are automatically added after checkout.",
    },
    {
        img: '',
        title: "Redeem Your Points",
        description: "Use your points for discounts, upgrades, or special perks on future bookings.",
    },
    {
        img: '',
        title: "Unlock Benefits",
        description: "The more you stay, the more VIP rewards and offers you unlock.",
    },
];

const StepCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="flex flex-col w-[268px] items-start bg-[#F9FAFB33] rounded-2xl p-4 gap-4">
        <div className="flex flex-col items-start gap-4">
            <div className="flex w-16 h-16 items-center justify-center bg-gray-100 rounded-[32px]">
                {/* <Image className="w-10 h-10" alt="Frame" src={img} width={40} height={40} /> */}
            </div>
            <div className="flex flex-col">
                <div className="font-medium text-cream-white text-[20px]">
                    {title}
                </div>
            </div>
        </div>
        <p className="font-normal text-cream-white text-[14px]">
            {description}
        </p>
    </div>
);

const HowItWork: React.FC = () => {
    return (
        <div className="flex flex-col items-center px-16 py-0 relative bg-primary-blue mt-[60px]">
            <div className="flex flex-col items-center justify-center gap-16 py-[92px] w-full">
                <div className="flex max-w-screen-xl items-start gap-16 w-full">
                    <div className="flex flex-col items-start gap-8 flex-1">
                        <h2 className="font-[600] text-white text-[39px]">How It Works</h2>
                        <p className="w-[700px] text-[20px] text-cream-white text-justify">
                            Earn points with every booking, track your balance, redeem for discounts, and unlock exclusive perks!
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {steps.map((step, index) => (
                        <StepCard key={index} title={step.title} description={step.description} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWork;