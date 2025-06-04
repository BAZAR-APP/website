
import * as React from "react";

const JoinUs = () => {
    return (
        <main className="flex flex-col relative min-h-[905px] text-white">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/bfb14513705ade3e6e2faeee9bd0eb6ce182ac16?placeholderIfAbsent=true"
                alt=""
                className="absolute h-full w-full object-cover inset-0"
                role="presentation"
            />

            <section className="relative w-full overflow-hidden px-16 max-md:px-5">
                <div className="flex w-full flex-col overflow-hidden items-center justify-center py-[92px] max-md:max-w-full">
                    <div className="flex w-full max-w-screen-xl gap-[40px_64px] max-md:max-w-full">
                        <div className="min-w-60 w-full flex-1 shrink basis-[0%] max-md:max-w-full">
                            <header className="w-full max-md:max-w-full">
                                <h1 className="w-full text-5xl font-semibold max-md:max-w-full max-md:text-[40px] text-white">
                                    Why Join?
                                </h1>
                                <p className="max-w-[700px] w-full text-xl font-normal text-justify mt-8 max-md:max-w-full text-white">
                                    Earn points on every booking, unlock exclusive discounts, enjoy VIP perks, and redeem anytime!
                                </p>
                            </header>
                            <div className="flex w-full gap-6 flex-wrap mt-8 max-md:max-w-full">
                                <article className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
                                    <h3 className="text-[39px] font-semibold max-md:max-w-full text-white">
                                        Exclusive Discounts
                                    </h3>
                                    <p className="text-base font-normal mt-4 max-md:max-w-full text-white">
                                        Redeem points for discounts on future stays and services.
                                    </p>
                                </article>
                                <article className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
                                    <h3 className="text-[39px] font-semibold max-md:max-w-full text-white">
                                        Unlock VIP Perks
                                    </h3>
                                    <p className="text-base font-normal mt-4 max-md:max-w-full text-white">
                                        Reach higher tiers for special benefits and exclusive offers.
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full overflow-hidden px-16 max-md:px-5">
                <div className="flex w-full flex-col overflow-hidden items-center justify-center pt-16 pb-[92px] max-md:max-w-full">
                    <div className="flex w-full max-w-screen-xl gap-[40px_64px] max-md:max-w-full">
                        <div className="min-w-60 w-full flex-1 shrink basis-[0%] max-md:max-w-full">
                            <header className="w-full max-md:max-w-full">
                                <h2 className="w-full text-5xl font-semibold max-md:max-w-full max-md:text-[40px] text-white">
                                    Earn Points Easily!
                                </h2>
                                <p className="max-w-[700px] w-full text-xl font-normal text-justify mt-8 max-md:max-w-full text-white">
                                    Maximize your benefits with every interaction! Earn points when you book a stay and leave a review. The more you engage, the more rewards you unlock. Start earning today and enjoy exclusive discounts on future bookings and add-ons!
                                </p>
                            </header>
                            <div className="flex w-full gap-6 font-semibold flex-wrap mt-8 max-md:max-w-full">
                                {/* Step Card 1 */}
                                <article className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
                                    <div className="text-[25px] leading-none max-md:max-w-full font-semibold text-white">
                    //1
                                    </div>
                                    <h3 className="text-[39px] mt-4 max-md:max-w-full font-semibold text-white">
                                        Book A Stay
                                    </h3>
                                </article>
                                {/* Step Card 2 */}
                                <article className="min-w-60 flex-1 shrink basis-[0%] max-md:max-w-full">
                                    <div className="text-[25px] leading-none max-md:max-w-full font-semibold text-white">
                    //2
                                    </div>
                                    <h3 className="text-[39px] mt-4 max-md:max-w-full font-semibold text-white">
                                        Submit A Review
                                    </h3>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default JoinUs