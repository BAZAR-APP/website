
import { termsData } from '@/lib/constant';
import React from 'react';

const Terms: React.FC = () => {
    return (
        <main className="flex flex-col justify-center items-start gap-10 self-stretch relative bg-white p-16 max-md:gap-8 max-md:px-8 max-md:py-10 max-sm:gap-6 max-sm:px-4 max-sm:py-6">
            <header className="flex w-[921px] flex-col items-start gap-4 relative max-md:w-full max-md:max-w-[921px]">
                <h1 className="self-stretch text-[#19191A] text-[39px] font-bold relative max-md:text-[32px] max-sm:text-[28px]">
                    Terms & Conditions
                </h1>
                <p className="self-stretch text-[#484A4C] text-xl font-normal relative max-md:text-lg max-sm:text-base">
                    Welcome to our platform. By using our service to book, manage, or explore chalets, you agree to the following terms and conditions:
                </p>
            </header>

            <article className="flex w-[698px] flex-col items-start gap-6 relative max-md:w-full max-md:max-w-[698px]">
                <div className="flex flex-col items-start gap-6 self-stretch relative">
                    <div className="flex flex-col items-start gap-6 self-stretch relative">
                        <div className="flex flex-col items-start gap-4 relative">
                            {termsData.map((term) => (
                                <section key={term.number} className="flex w-[698px] flex-col items-start gap-2 relative mb-4 max-md:w-full">
                                    <h3 className="self-stretch text-[#19191A] text-base font-normal leading-6 relative max-sm:text-[15px]">
                                        {term.number}. {term.title}
                                    </h3>
                                    <div className="self-stretch text-[#484A4C] text-base font-normal relative max-sm:text-[15px]">
                                        {term.content.map((paragraph, index) => (
                                            <React.Fragment key={index}>
                                                <span>{paragraph}</span>
                                                {index < term.content.length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="flex flex-col items-start gap-6 self-stretch relative">
                    <p className="self-stretch text-[#19191A] text-lg font-bold leading-7 relative gap-6 max-sm:text-base max-sm:leading-6">
                        If you have any questions about these terms, please contact our support team or reach out via our chatbot.
                    </p>
                </footer>
            </article>
        </main>
    );
};

export default Terms;
