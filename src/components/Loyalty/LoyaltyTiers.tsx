import React from "react";
import { Button, LoyaltyTiersCardSection } from "@/components";
import { ArrowUpRight } from 'lucide-react';

export const LoyaltyTiers: React.FC = () => {
    return (
        <div className="flex flex-col w-full items-center gap-24 px-20 py-24 bg-white">
            <div className="flex flex-col items-start gap-12 w-full">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-[39px] font-medium text-[#19191A]">
                            Loyalty Tiers
                        </h1>
                        <p className="text-[#484A4C] text-[20px]">
                            Earn More, Save More, Enjoy Exclusive Benefits!
                        </p>
                    </div>

                    <div className="flex items-center">
                        <Button className="!bg-gray-100 !text-primary">
                            Compare Between Tiers <ArrowUpRight />
                        </Button>
                    </div>
                </div>
                <LoyaltyTiersCardSection />
            </div>
        </div>
    );
};

export default LoyaltyTiers;