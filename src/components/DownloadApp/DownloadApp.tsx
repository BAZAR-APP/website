import Image from "next/image";
import React from "react";

const DownloadApp: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-8 px-4 md:px-16 pt-16 relative bg-[#29397EE0] rounded-[50px] w-[90%] mx-auto overflow-hidden"
            style={{
                background: "linear-gradient(rgba(41, 57, 126, 0.88), rgba(41, 57, 126, 0.88)), url('/images/AppSectionBackground.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "auto",
            }}
        >
            <div className="flex flex-col items-start gap-6 flex-1">
                <div className="flex flex-col max-w-[480px] items-start gap-4 w-full">
                    <h2 className="font-[500] text-white text-[32px] md:text-[39px]">
                        Download the App
                    </h2>

                    <p className="font-normal text-white text-[16px] md:text-[18px]">
                        Book chalets, manage your stays, and redeem rewards — all from your
                        phone. Anytime, anywhere.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    <Image src={"/images/AppStore.svg"} alt="App Store" width={168} height={56} className="!h-14" />
                    <Image src={"/images/GooglePlay.svg"} alt="Google Play" width={168} height={56} className="!h-14" />
                </div>
            </div>

            <div className="relative flex-1 h-[300px] md:h-[512px] w-full hidden md:block">
                <Image src={"/images/AppPlaceHolder.png"} alt="Placeholder" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
};

export default DownloadApp;