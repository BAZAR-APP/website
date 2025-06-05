import Image from "next/image";
import React from "react";

const DownloadApp: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8 px-4 py-4 md:py-0 md:px-16 md:pt-16 relative bg-[#29397EE0] rounded-[20px] md:rounded-[50px] mx-4 md:mx-[64px] overflow-hidden"
            style={{
                background: "linear-gradient(rgba(41, 57, 126, 0.88), rgba(41, 57, 126, 0.88)), url('/images/AppSectionBackground.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "auto",
            }}
        >
            <section className="max-w-screen-xl w-full flex flex-col md:flex-row relative mx-auto mb-0">
                <div className="flex flex-col items-start gap-6 justify-center flex-1">
                    <div className="flex flex-col max-w-[420px] items-start gap-4 w-full">
                        <h2 className="text-[32px] md:text-[39px] font-semibold text-white">
                            Download the App
                        </h2>

                        <p className="font-normal text-white text-[20px]">
                            Book chalets, manage your stays, and redeem rewards — all from your
                            phone. Anytime, anywhere.
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-start md:justify-start gap-2 md:gap-3 w-full md:w-auto h-[68px]">
                        <Image
                            src="/images/AppStore.svg"
                            alt="App Store"
                            width={160}
                            height={50}
                            className="md:shrink-0 w-[130px] md:w-[180px]"
                        />
                        <Image
                            src="/images/GooglePlay.svg"
                            alt="Google Play"
                            width={180}
                            height={50}
                            className="md:shrink-0 w-[130px] md:w-[180px]"
                        />
                    </div>

                </div>

                <div className="relative flex-1 h-[200px] md:h-[300px] lg:h-[480px] w-full hidden md:block">
                    <Image
                        src="/images/AppPlaceHolder.png"
                        alt="App Placeholder"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-[20px]"
                    />
                </div>
            </section>
        </div>
    );
};

export default DownloadApp;