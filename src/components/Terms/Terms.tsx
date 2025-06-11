import { termsData } from '@/lib/constant';
import React from 'react';


const Terms: React.FC = () => {
    return (
        <main className="flex flex-col justify-center items-start gap-10 bg-white px-6 py-12 md:px-16 md:py-16 sm:gap-8 sm:px-4 sm:py-6">
            <header className="w-full max-w-4xl flex flex-col items-start gap-4">
                <h1 className="text-[#19191A] text-3xl md:text-[39px] font-bold">
                    Terms & Conditions
                </h1>
                <p className="text-[#484A4C] text-base md:text-[20px]">
                    Welcome to our platform. By using our service to book, manage, or explore chalets, you agree to the following terms and conditions:
                </p>
            </header>

            <article className="w-full max-w-3xl flex flex-col items-start gap-4">
                {termsData.map((term) => (
                    <section key={term.number} className="flex flex-col items-start gap-2 w-full mb-4">
                        <h3 className="text-[#19191A] text-sm sm:text-base font-semibold leading-6">
                            {term.number}. {term.title}
                        </h3>
                        <div className="text-[#484A4C] text-sm sm:text-base font-normal leading-6">
                            <ul className="list-[disc] pl-5 space-y-2">
                                {term.content.map((paragraph, index) => (
                                    <li key={index}>{paragraph}</li>
                                ))}
                            </ul>
                        </div>

                    </section>
                ))}

                <footer className="w-full mt-4">
                    <p className="text-[#19191A] text-base sm:text-lg font-semibold leading-6">
                        If you have any questions about these terms, please contact our support team or reach out via our chatbot.
                    </p>
                </footer>
            </article>

        </main>
    );
};

export default Terms;
