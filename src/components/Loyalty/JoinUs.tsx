import * as React from "react";

const JoinUs = () => {
    return (
        <main className="flex flex-col relative min-h-screen text-white">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/bfb14513705ade3e6e2faeee9bd0eb6ce182ac16?placeholderIfAbsent=true"
                alt=""
                className="absolute h-full w-full object-cover inset-0"
                role="presentation"
            />

            {/* Section 1 */}
            <section className="relative w-full px-4 md:px-16">
                <div className="flex flex-col items-center justify-center py-16 md:py-24">
                    <div className="w-full max-w-screen-xl">
                        <div className="flex flex-col md:flex-row gap-10 md:gap-[64px]">
                            <div className="w-full">
                                <header className="text-center md:text-left">
                                    <h1 className="text-3xl md:text-5xl font-semibold">
                                        Why Join?
                                    </h1>
                                    <p className="text-base md:text-xl font-normal mt-6 text-justify md:text-left">
                                        Earn points on every booking, unlock exclusive discounts, enjoy VIP perks, and redeem anytime!
                                    </p>
                                </header>

                                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                                    <article className="w-full sm:w-1/2">
                                        <h3 className="text-2xl md:text-[39px] font-semibold">
                                            Exclusive Discounts
                                        </h3>
                                        <p className="text-sm md:text-base font-normal mt-2">
                                            Redeem points for discounts on future stays and services.
                                        </p>
                                    </article>
                                    <article className="w-full sm:w-1/2">
                                        <h3 className="text-2xl md:text-[39px] font-semibold">
                                            Unlock VIP Perks
                                        </h3>
                                        <p className="text-sm md:text-base font-normal mt-2">
                                            Reach higher tiers for special benefits and exclusive offers.
                                        </p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="relative w-full px-4 md:px-16">
                <div className="flex flex-col items-center justify-center pt-10 pb-20">
                    <div className="w-full max-w-screen-xl">
                        <div className="flex flex-col md:flex-row gap-10 md:gap-[64px]">
                            <div className="w-full">
                                <header className="text-center md:text-left">
                                    <h2 className="text-3xl md:text-5xl font-semibold">
                                        Earn Points Easily!
                                    </h2>
                                    <p className="text-base md:text-xl font-normal mt-6 text-justify md:text-left">
                                        Maximize your benefits with every interaction! Earn points when you book a stay and leave a review.
                                        The more you engage, the more rewards you unlock. Start earning today and enjoy exclusive discounts
                                        on future bookings and add-ons!
                                    </p>
                                </header>

                                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                                    {/* Step Card 1 */}
                                    <article className="w-full sm:w-1/2">
                                        <div className="text-lg md:text-xl font-semibold">//1</div>
                                        <h3 className="text-2xl md:text-[39px] mt-2 font-semibold">
                                            Book A Stay
                                        </h3>
                                    </article>

                                    {/* Step Card 2 */}
                                    <article className="w-full sm:w-1/2">
                                        <div className="text-lg md:text-xl font-semibold">//2</div>
                                        <h3 className="text-2xl md:text-[39px] mt-2 font-semibold">
                                            Submit A Review
                                        </h3>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default JoinUs;
