const Privacy = () => {
    return (
        <div className="main-container flex flex-col gap-10 justify-center items-start bg-white relative overflow-hidden mx-auto px-5 py-10 max-w-screen-xl">

            <div className="flex flex-col gap-4 items-start w-full max-w-full sm:max-w-[921px]">
                <h1 className="text-[#19191A] text-2xl sm:text-3xl md:text-[39px] font-bold">
                    Privacy Policy
                </h1>
                <span className="font-['Inter'] text-base sm:text-lg leading-6 text-[#484a4c]">
                    We respect your privacy and are committed to protecting your personal
                    information. This Privacy Policy explains how we collect, use, and
                    safeguard your data when you use our platform.
                </span>
            </div>

            <div className="flex flex-col gap-6 items-start w-full max-w-full sm:max-w-[698px] z-10">
                <div className="flex flex-col gap-6 w-full">

                    {/* Section 1 */}
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-['Inter'] text-base font-medium leading-6 text-[#19191a] whitespace-nowrap">
                            1. Information We Collect
                        </span>
                        <span className="font-['Inter'] text-base font-normal leading-5 text-[#484a4c]">
                            We may collect the following types of information:
                            <br /><br />
                            <ul className="list-disc pl-5 space-y-1 max-w-full">
                                <li>Personal Information: Name, phone number, and any additional details you provide when signing up or making a booking.</li>
                                <li>Booking Information: Chalet preferences, stay dates, payment methods, and special requests.</li>
                                <li>Device & Usage Data: IP address, browser type, app activity, and device information to help us improve the platform.</li>
                                <li>Chat & Support Conversations: Messages sent via our AI chatbot or support channels for service improvement.</li>
                            </ul>
                        </span>
                    </div>

                    {/* Section 2 */}
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-['Inter'] text-base font-medium leading-6 text-[#19191a] whitespace-nowrap">
                            2. How We Use Your Information
                        </span>
                        <span className="font-['Inter'] text-base font-normal leading-5 text-[#484a4c]">
                            We use your information to:
                            <br /><br />
                            <ul className="list-disc pl-5 space-y-1 max-w-full">
                                <li>Process and manage bookings.</li>
                                <li>Communicate booking updates, promotions, or service-related messages.</li>
                                <li>Customize your experience, including loyalty points and recommendations.</li>
                                <li>Improve the platform, troubleshoot issues, and enhance security.</li>
                                <li>Comply with legal requirements and prevent fraud.</li>
                            </ul>
                        </span>
                    </div>

                    {/* Section 3 */}
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-['Inter'] text-base font-medium leading-6 text-[#19191a] whitespace-nowrap">
                            3. Sharing Your Information
                        </span>
                        <span className="font-['Inter'] text-base font-normal leading-5 text-[#484a4c]">
                            We do not sell or rent your personal information. We may share
                            data only with:
                            <br /><br />
                            <ul className="list-disc pl-5 space-y-1 max-w-full">
                                <li>Payment providers (e.g., KNET, Apple Pay, Google Pay, and other secure gateways) for processing payments safely.</li>
                                <li>Service providers (e.g., decorators, transportation companies) when you request additional services.</li>
                                <li>Legal authorities if required by law or necessary to protect our users and services.</li>
                            </ul>
                        </span>
                    </div>

                    {/* Section 4 */}
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-['Inter'] text-base font-medium leading-6 text-[#19191a] whitespace-nowrap">
                            4. Data Security
                        </span>
                        <span className="font-['Inter'] text-base font-normal leading-5 text-[#484a4c]">
                            We take your privacy seriously. Your data is protected with
                            secure servers and encryption protocols. Access is limited to
                            authorized personnel only.
                        </span>
                    </div>

                    {/* Section 5 */}
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-['Inter'] text-base font-medium leading-6 text-[#19191a] whitespace-nowrap">
                            5. Your Rights
                        </span>
                        <span className="font-['Inter'] text-base font-normal leading-5 text-[#484a4c]">
                            You have the right to:
                            <br />
                            <ul className="list-disc pl-5 space-y-1 max-w-full">
                                <li>View or update your personal information.</li>
                                <li>Request deletion of your account.</li>
                                <li>Opt out of marketing notifications at any time.</li>
                                <li>To exercise these rights, contact us via our in-app chat or support team.</li>
                            </ul>
                        </span>
                    </div>

                    {/* Section 6 */}
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-['Inter'] text-base font-medium leading-6 text-[#19191a] whitespace-nowrap">
                            6. Cookies & Tracking
                        </span>
                        <span className="font-['Inter'] text-base font-normal leading-5 text-[#484a4c]">
                            We use cookies to improve your experience, remember
                            preferences, and analyze traffic. You can control cookie
                            settings in your browser.
                        </span>
                    </div>

                    {/* Section 7 */}
                    <div className="flex flex-col gap-2 w-full">
                        <span className="font-['Inter'] text-base font-medium leading-6 text-[#19191a] whitespace-nowrap">
                            7. Changes to This Policy
                        </span>
                        <span className="font-['Inter'] text-base font-normal leading-5 text-[#484a4c]">
                            We may update this Privacy Policy as needed. Significant
                            changes will be communicated via the app or website.
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <span className="font-['Inter'] text-lg font-semibold leading-7 text-[#19191a]">
                        If you have any questions about these terms, please contact our
                        support team or reach out via our chatbot.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
