"use client"
import { useRouter } from 'next/navigation'
import Button from '../Button/Button';


const SavingSection = () => {
    const router = useRouter()
    return (
        <div className="main-container flex flex-col items-center gap-24 py-16 md:py-24 mt-10 md:mt-16 mx-4 md:mx-auto  md:px-16 max-md:px-5 bg-white">
            <div className="flex flex-col md:flex-row gap-12 items-start w-full">

                <div className="flex justify-center md:items-center shrink-0 bg-[#f3f4f6] rounded-[137px] p-6 md:p-9 w-[160px] h-[160px] md:w-[274px] md:h-[274px]">
                    <div
                        className="w-[100px] h-[100px] md:w-[171px] md:h-[171px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-03/ce2kJLDrws.png)] bg-cover bg-no-repeat"
                        role="img"
                        aria-label="Diamond exclusive savings image"
                    />
                </div>



                <div className="flex flex-col gap-6 flex-grow max-w-[960px]">
                    <h2 className="text-black font-semibold text-[32px] sm:text-3xl leading-[1.2] whitespace-normal">
                        Diamond Exclusive: Boost Your Savings!
                    </h2>
                    <p className="font-['Inter'] text-[#484a4c] text-base sm:text-lg leading-[1.3]">
                        Activate your discount booster and enjoy up to 20% off future chalet bookings — only for Diamond tier members.
                    </p>
                    <Button
                        className="bg-[#29397e] min-w-[190px] text-white font-medium text-base leading-6 rounded-md py-3 px-5 w-max hover:bg-[#3f4faa] transition-colors"
                        type="button"
                        onClick={() => router.push("/register")}
                    >
                        Register Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SavingSection;
