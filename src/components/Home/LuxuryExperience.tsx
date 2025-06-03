"use client"
import React, { useState } from 'react';

const LuxuryExperience: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleLearnMore = () => {
        console.log('Learn more about Bazar resort');
    };

    return (
        <section className="flex flex-col items-center gap-16 self-stretch relative bg-[#FDFDFE] px-0 py-24 max-md:px-0 max-md:py-16 max-sm:px-0 max-sm:py-12">
            <div className="max-w-screen-xl flex flex-col items-start gap-8 self-stretch relative w-full mx-auto my-0 px-5 py-0 max-md:max-w-[991px] max-md:px-4 max-md:py-0 max-sm:max-w-screen-sm">
                <div className="flex items-start gap-8 self-stretch relative max-md:flex-col max-md:gap-6">
                    {/* Hero Section */}
                    <header className="flex max-w-[1440px] flex-col items-start gap-5 flex-[1_0_0] relative">
                        <h1 className="self-stretch text-[#101828] text-5xl font-bold relative gap-[-54px] max-md:text-4xl max-sm:text-[28px]">
                            Escape to luxury and comfort at Bazar
                        </h1>
                        <div className="flex flex-col items-start gap-[-54px] self-stretch relative">
                            {/* Star Icon Button */}
                            <div className="flex items-center gap-2 relative p-0 rounded-[80.439px] bg-[#29397E] max-md:justify-center max-md:flex-wrap max-md:gap-4 max-sm:gap-3">
                                <div className="flex items-start relative bg-[rgba(255,251,235,0.00)] p-[18.282px] rounded-[18279.707px] max-md:justify-center max-md:flex-wrap max-md:gap-4 max-sm:gap-3 max-sm:p-3">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                "<svg id=\"2159:14838\" layer-name=\"sea-star-svgrepo-com\" width=\"41\" height=\"40\" viewBox=\"0 0 41 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"star-icon\" style=\"width: 40px; height: 40px; aspect-ratio: 1/1; position: relative\"> <path d=\"M16.6589 34.125L12.0339 36.625C10.2839 37.5 8.28386 36.125 8.65886 34.25L9.65886 28.625C10.0339 26.25 9.28386 23.75 7.53386 22L3.53385 18C2.15885 16.625 2.90885 14.375 4.78385 14.125L10.1589 13.375C12.6589 13 14.7839 11.375 15.9089 9.125L18.2839 4.25C19.1589 2.5 21.6589 2.5 22.4089 4.25L24.7839 9.125C25.9089 11.375 28.0339 13 30.5339 13.375L35.9089 14.125C37.7839 14.375 38.5339 16.75 37.1589 18L33.1589 22C31.4089 23.75 30.6589 26.25 31.0339 28.625L32.0339 34.25C32.4089 36.125 30.4089 37.625 28.6589 36.625L24.0339 34.125C21.6589 32.875 18.9089 32.875 16.6589 34.125Z\" stroke=\"#FDFDFE\" stroke-width=\"2\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M21.5312 16.25C21.1562 16.25 20.9062 16.125 20.6562 15.875C20.5312 15.75 20.4063 15.625 20.4063 15.5C20.2813 15.375 20.2812 15.125 20.2812 15C20.2812 14.875 20.2813 14.625 20.4063 14.5C20.5313 14.375 20.5312 14.25 20.6562 14.125C21.1562 13.625 21.9063 13.625 22.4063 14.125C22.5313 14.25 22.6562 14.375 22.6562 14.5C22.6562 14.625 22.7812 14.875 22.7812 15C22.7812 15.125 22.7812 15.375 22.6562 15.5C22.5312 15.625 22.5313 15.75 22.4063 15.875C22.1563 16.125 21.9063 16.25 21.5312 16.25Z\" fill=\"#FDFDFE\"></path> <path d=\"M26.5312 22.5C26.1562 22.5 25.9062 22.375 25.6562 22.125C25.5312 22 25.4063 21.875 25.4063 21.75C25.2813 21.625 25.2812 21.375 25.2812 21.25C25.2812 21.125 25.2813 20.875 25.4063 20.75C25.5313 20.625 25.5312 20.5 25.6562 20.375C26.1562 19.875 26.9063 19.875 27.4063 20.375C27.5313 20.5 27.6562 20.625 27.6562 20.75C27.6562 20.875 27.7812 21.125 27.7812 21.25C27.7812 21.375 27.7812 21.625 27.6562 21.75C27.5312 21.875 27.5313 22 27.4063 22.125C27.1563 22.375 26.9063 22.5 26.5312 22.5Z\" fill=\"#FDFDFE\"></path> <path d=\"M25.2812 26.25C24.9062 26.25 24.6562 26.125 24.4062 25.875C24.2812 25.75 24.1563 25.625 24.1563 25.5C24.0313 25.375 24.0312 25.125 24.0312 25C24.0312 24.875 24.0313 24.625 24.1563 24.5C24.2813 24.375 24.2812 24.25 24.4062 24.125C24.9062 23.625 25.6563 23.625 26.1563 24.125C26.2813 24.25 26.4062 24.375 26.4062 24.5C26.4062 24.625 26.5312 24.875 26.5312 25C26.5312 25.125 26.5312 25.375 26.4062 25.5C26.2812 25.625 26.2813 25.75 26.1563 25.875C25.9063 26.125 25.6563 26.25 25.2812 26.25Z\" fill=\"#FDFDFE\"></path> <path d=\"M17.7812 27.5C17.4062 27.5 17.1563 27.375 16.9063 27.125C16.7813 27 16.6563 26.875 16.6563 26.75C16.5313 26.625 16.5312 26.375 16.5312 26.25C16.5312 26.125 16.5313 25.875 16.6563 25.75C16.7813 25.625 16.7813 25.5 16.9063 25.375C17.4063 24.875 18.1562 24.875 18.6562 25.375C18.7812 25.5 18.9062 25.625 18.9062 25.75C18.9062 25.875 19.0312 26.125 19.0312 26.25C19.0312 26.375 19.0312 26.625 18.9062 26.75C18.7812 26.875 18.7812 27 18.6562 27.125C18.4062 27.375 18.1563 27.5 17.7812 27.5Z\" fill=\"#FDFDFE\"></path> <path d=\"M12.7812 21.25C12.4062 21.25 12.1563 21.125 11.9063 20.875C11.7813 20.75 11.6563 20.625 11.6563 20.5C11.5313 20.375 11.5312 20.125 11.5312 20C11.5312 19.875 11.5313 19.625 11.6563 19.5C11.7813 19.375 11.7813 19.25 11.9063 19.125C12.4063 18.625 13.1562 18.625 13.6562 19.125C13.7812 19.25 13.9062 19.375 13.9062 19.5C13.9062 19.625 14.0312 19.875 14.0312 20C14.0312 20.125 14.0312 20.375 13.9062 20.5C13.7812 20.625 13.7812 20.75 13.6562 20.875C13.4062 21.125 13.1563 21.25 12.7812 21.25Z\" fill=\"#FDFDFE\"></path> </svg>",
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Building Icon Button */}
                            <div className="flex items-center gap-2 relative p-0 rounded-[80.439px] bg-gray-100">
                                <div className="flex items-start relative bg-[rgba(255,251,235,0.00)] p-[18.282px] rounded-[18279.707px] max-md:justify-center max-md:flex-wrap max-md:gap-4 max-sm:gap-3 max-sm:p-3">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                "<svg id=\"2159:14852\" layer-name=\"Frame\" width=\"45\" height=\"44\" viewBox=\"0 0 45 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"building-icon\" style=\"width: 43.437px; height: 43.437px; position: relative\"> <path d=\"M15.7733 38.2886V29.4655C15.7733 28.3416 16.6855 27.4294 17.8094 27.4294H21.8816C23.0055 27.4294 23.9177 28.3416 23.9177 29.4655V38.2886M23.9177 38.2886H32.0621V6.69732M23.9177 38.2886H37.4918V19.7374M32.0621 6.69732L34.7769 5.71094M32.0621 6.69732L13.0585 13.6092M37.4918 19.7374L32.0621 17.9276M37.4918 19.7374L40.2066 20.6424M4.91406 38.2886H7.62887M7.62887 38.2886H40.2066M7.62887 38.2886V5.71094H13.0585V13.6092M4.91406 16.5702L13.0585 13.6092\" stroke=\"#19191A\" stroke-width=\"1.20658\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Waves Icon Button */}
                            <div className="flex items-center gap-2 relative p-0 rounded-[80.439px] border border-[1.828px] border-solid">
                                <div className="flex items-start relative bg-[rgba(255,251,235,0.00)] p-[18.282px] rounded-[18279.707px] max-md:justify-center max-md:flex-wrap max-md:gap-4 max-sm:gap-3 max-sm:p-3">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                "<svg id=\"2159:14856\" layer-name=\"sea-waves-svgrepo-com\" width=\"41\" height=\"40\" viewBox=\"0 0 41 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"waves-icon\" style=\"width: 40px; height: 40px; aspect-ratio: 1/1; position: relative\"> <path d=\"M5.84375 16.6641C9.98168 16.6641 13.0851 11.6641 13.0851 11.6641C13.0851 11.6641 16.1886 16.6641 20.3266 16.6641C24.4644 16.6641 28.6024 11.6641 28.6024 11.6641C28.6024 11.6641 32.7402 16.6641 35.8437 16.6641\" stroke=\"#19191A\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> <path d=\"M5.84375 28.3359C9.98168 28.3359 13.0851 23.3359 13.0851 23.3359C13.0851 23.3359 16.1886 28.3359 20.3266 28.3359C24.4644 28.3359 28.6024 23.3359 28.6024 23.3359C28.6024 23.3359 32.7402 28.3359 35.8437 28.3359\" stroke=\"#19191A\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </svg>",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex w-[611px] flex-col items-start gap-[61px] relative max-md:w-full">
                        {/* Image Gallery */}
                        <figure className="flex w-[611px] flex-col items-start gap-[61px] relative max-md:w-full">
                            <div className="flex h-[232px] justify-between items-start self-stretch relative max-md:flex-col max-md:h-auto max-md:gap-4">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/713e4af6672d6f5c8e66dfde7936a2dd6eb29123?placeholderIfAbsent=true"
                                    alt="Main resort view showcasing luxury chalets"
                                    className="w-[275px] h-[232px] relative rounded-[20px] max-md:w-full max-md:h-[200px]"
                                />
                                <div className="flex w-[300px] flex-col items-start gap-[15px] relative max-md:w-full">
                                    <div className="flex justify-between items-center self-stretch relative max-sm:flex-col max-sm:gap-3">
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9b48e4de65efdd91cbdf136ba8b9ade44b078fc?placeholderIfAbsent=true"
                                            alt="Luxury chalet interior"
                                            className="w-[141px] h-[108px] relative rounded-[20px] max-md:w-[calc(50%_-_7.5px)] max-md:h-[100px] max-sm:w-full"
                                        />
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8115a00e449569b51058a08d7a03dd0c0adae6f3?placeholderIfAbsent=true"
                                            alt="Sea view from chalet"
                                            className="w-[141px] h-[108px] relative rounded-[20px] max-md:w-[calc(50%_-_7.5px)] max-md:h-[100px] max-sm:w-full"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center self-stretch relative max-sm:flex-col max-sm:gap-3">
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc040d48794f3060a950d23798e6473c7763064a?placeholderIfAbsent=true"
                                            alt="Resort amenities"
                                            className="w-[141px] h-[108px] relative rounded-[20px] max-md:w-[calc(50%_-_7.5px)] max-md:h-[100px] max-sm:w-full"
                                        />
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3667f8d47098a73c20c44f0e1c3a7e2deab34a1?placeholderIfAbsent=true"
                                            alt="Coastal landscape"
                                            className="w-[141px] h-[108px] relative rounded-[20px] max-md:w-[calc(50%_-_7.5px)] max-md:h-[100px] max-sm:w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </figure>

                        {/* Description Section */}
                        <article className="flex items-start gap-[94px] relative bottom-[content] max-md:flex-col max-md:gap-6">
                            <p className="w-[311px] h-[87px] text-gray-700 text-base italic font-normal relative max-md:w-full max-md:h-auto">
                                where breathtaking views meet world-class hospitality. Whether
                                you're seeking a relaxing retreat or an adventure by the sea,
                                our chalets offer the perfect getaway.
                            </p>
                            <div className="flex items-start relative">
                                <button
                                    onClick={handleLearnMore}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className={`text-[#19191A] text-sm font-normal leading-5 relative gap-2 border shadow-[0px_1px_2px_0px_rgba(31,41,55,0.08)] bg-[#FDFDFE] px-4 py-2 rounded-lg border-solid border-[#19191A] transition-all duration-200 hover:bg-[#19191A] hover:text-[#FDFDFE] focus:outline-none focus:ring-2 focus:ring-[#19191A] focus:ring-offset-2 ${isHovered ? 'transform scale-105' : ''
                                        }`}
                                    aria-label="Learn more about Bazar resort amenities and services"
                                >
                                    More About Us
                                </button>
                            </div>
                        </article>
                    </div>
                </div>

                {/* Testimonial Section */}
                <section className="flex flex-col items-start gap-8 self-stretch relative">
                    <div className="flex max-w-[1440px] flex-col items-start gap-5 self-stretch relative">
                        <div className="flex w-[976px] flex-col items-start gap-[-54px] relative max-md:w-full">
                            <blockquote className="h-[165px] self-stretch text-[#101828] text-4xl font-normal leading-[55px] tracking-[-0.72px] relative max-md:text-[28px] max-md:leading-10 max-sm:text-2xl max-sm:leading-8">
                                Bazar offers a luxurious escape with stunning sea views and
                                premium amenities. Our chalets provide the perfect
                            </blockquote>
                            <p className="w-[976px] h-[175px] relative text-[#101828] text-4xl font-normal leading-[55px] tracking-[-0.72px] gap-2 self-stretch px-[11px] py-0 top-[9px] max-md:text-[28px] max-md:leading-10 max-sm:text-2xl max-sm:leading-8">
                                blend of comfort and elegance, ensuring a memorable stay.
                                Whether for relaxation or adventure, experience hospitality at
                                its finest.
                            </p>
                            <div className="flex justify-center items-center gap-2 relative pl-0 pr-2 py-2 bottom-[106px] max-sm:justify-start">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/05cdf8db84fe4a4e6febdd6351a6ca976800da74?placeholderIfAbsent=true"
                                    alt="Guest testimonial profile"
                                    className="w-[129px] h-[53px] relative rounded-[1000px]"
                                />
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0349bf6f2a8220b4fb7d36749394cc033fcce539?placeholderIfAbsent=true"
                                    alt="Additional guest profile"
                                    className="w-[53px] h-[53px] relative rounded-[1000px]"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default LuxuryExperience;
