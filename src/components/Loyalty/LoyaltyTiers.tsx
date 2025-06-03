import React from "react";
import { Button } from "@/components"
import { ArrowUpRight } from 'lucide-react';



export const Section: React.FC = () => {
    return (
        <div className="flex flex-col w-[1440px] items-center gap-24 px-20 py-24 relative bg-white">
            <div className="flex flex-col items-start gap-12 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-start justify-between self-stretch w-full relative flex-[0_0_auto]">
                    <div className="items-start flex flex-col w-[491px] gap-6 relative">
                        <div className="relative self-stretch mt-[-1.00px] font-39-bold font-[number:var(--39-bold-font-weight)] text-color-tokens-text-text-primary text-[length:var(--39-bold-font-size)] tracking-[var(--39-bold-letter-spacing)] leading-[var(--39-bold-line-height)] [font-style:var(--39-bold-font-style)]">
                            Loyalty Tiers
                        </div>

                        <p className="relative self-stretch font-inter-20px-regular font-[number:var(--inter-20px-regular-font-weight)] text-color-tokens-text-text-secondary text-[length:var(--inter-20px-regular-font-size)] tracking-[var(--inter-20px-regular-letter-spacing)] leading-[var(--inter-20px-regular-line-height)] [font-style:var(--inter-20px-regular-font-style)]">
                            Earn More, Save More, Enjoy Exclusive Benefits!
                        </p>
                    </div>

                    <div className="items-end justify-center flex flex-col w-[491px] gap-6 relative">
                        <Button>
                            Compare Between Tiers <ArrowUpRight />

                        </Button>

                    </div>
                </div>


            </div>
        </div>
    );
};
