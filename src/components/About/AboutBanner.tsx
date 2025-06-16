import React from 'react';

const AboutBanner = () => {
    return (
        <>
            <div className="main-container w-full flex flex-col items-center bg-[#fdfdfe] relative overflow-hidden px-4 py-16 md:px-8 p-6 md:p-12 lg:p-16 md:py-[92px]">
                <div className="flex flex-col gap-16 justify-center items-center w-full">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full">

                        <div className="w-full lg:w-[45%] flex justify-center">
                            <div
                                className="w-full  aspect-[515/348] bg-[rgba(255,239,239,0.2)] bg-cover bg-no-repeat bg-center rounded-[30px]"
                                style={{
                                    backgroundImage:
                                        "url(/images/aboutPageBanner.svg)",
                                }}
                            />
                        </div>


                        <div className="w-full lg:w-[55%] justify-center flex flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <h1 className="text-[clamp(40px,7vw,92px)] font-bold leading-tight tracking-tight text-[#29397e]">
                                    About
                                </h1>
                                <h1 className="text-[clamp(40px,7vw,92px)] font-bold leading-tight tracking-tight text-[#19191a] -mt-2">
                                    Bazar
                                </h1>
                            </div>
                            <p className="text-base md:text-[20px] text-[#484a4c] leading-[100%] text-justify max-w-2xl">
                                {`Bazar offers a luxurious yet peaceful stay with breathtaking views of the sea,
                                private outdoor spaces, and elegant interiors. Whether you're looking for a
                                romantic retreat, a family getaway, or a relaxing weekend with friends, our
                                spaces are crafted to create unforgettable moments by the water.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutBanner;
