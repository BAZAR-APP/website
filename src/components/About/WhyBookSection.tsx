const WhyBookSection = () => {
    const features = [
        {
            title: "Local Experts, Just for You",
            description: "Personalized host concierge or local tour guide",
            icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/pingRtuwxV.png",
        },
        {
            title: "Memory Maker Bundle",
            description: "Memory Maker Bundle for unforgettable stays",
            icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/6HJzU9bQe6.png",
        },
        {
            title: "Verified & Transparent",
            description: "Verified guest badges and transparency scores based on reviews and cleanliness",
            icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/2TTd78is0R.png",
        },
        {
            title: "Loyalty That Rewards You",
            description: "Seasonal loyalty challenges—stay 2 nights, get 1 free",
            icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/GC2Vzv3ojq.png",
        },
        {
            title: "Only the Best Hosts",
            description: "Trusted hosts, handpicked by Bazar",
            icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/7LriOcRppj.png",
        },


        {
            title: "Stay Your Way",
            description: "Flexible bookings: from a few hours to full-month stays",
            icon: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/b9R7HmCpZK.png",
        },
    ];

    return (
        <div className="main-container w-full flex flex-col items-start relative overflow-hidden mx-auto my-0"
            style={{
                background: "linear-gradient(rgba(41, 57, 126, 0.88), rgba(41, 57, 126, 0.88)), url('/images/AppSectionBackground.png')",
                backgroundSize: "cover",
                height: "auto",
            }}>
            <div className="flex pt-[64px] pr-[64px] pb-[64px] pl-[64px] flex-col gap-[64px] max-w-[1280px] mx-auto">
                <div className="flex flex-col gap-[32px]">
                    <h2 className="font-inter text-[39px] font-semibold text-white">Why book with us?</h2>
                    <p className="w-full md:w-[506px] font-inter text-[20px] text-white">
                        Experience comfort, trust, and flexibility—every stay, every time.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-full md:max-w-[70%]">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-[rgba(249,250,251,0.3)] rounded-[20px] p-[24px] flex flex-col gap-[20px]">
                            <div className="flex w-[80px] h-[80px] justify-center items-center bg-[#29397e] rounded-full shadow-md">
                                <div className="w-[36.923px] h-[36.923px] bg-cover" style={{ backgroundImage: `url(${feature.icon})` }} />
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <span className="font-inter text-[25px] font-medium text-white">{feature.title}</span>
                                <span className="font-inter text-[16px] text-white">{feature.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyBookSection;