interface WhyBookSectionProps {
  messages: {
    heading: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
}


const WhyBookSection: React.FC<WhyBookSectionProps> = ({ messages }) => {
     const featureIcons = [
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/pingRtuwxV.png",
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/6HJzU9bQe6.png",
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/2TTd78is0R.png",
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/GC2Vzv3ojq.png",
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/7LriOcRppj.png",
        "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/b9R7HmCpZK.png",
    ];

    return (
        <div className="w-full flex flex-col items-start relative overflow-hidden mx-auto my-0"
            style={{
                background: "linear-gradient(rgba(41, 57, 126, 0.88), rgba(41, 57, 126, 0.88)), url('/images/AppSectionBackground.png')",
                backgroundSize: "cover",
                height: "auto",
            }}>
            <div className="flex flex-col items-start gap-8 self-stretch relative w-full mx-auto my-0 py-[32px] md:py-[64px] max-md:max-w-[991px] md:px-16 max-md:px-5">
                <div className="flex flex-col gap-4">
                    <h2 className="font-inter text-[32px] md:text-[39px] font-semibold text-white text-left">{messages.heading}</h2>
                    <p className="w-full md:w-[506px] font-inter text-[16px] md:text-[20px] text-white text-left">
                        {messages.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-[80%] md:w-[100%]">
                    {messages.features.map((feature, index) => (
                        <div key={index} className="bg-[rgba(249,250,251,0.3)] rounded-[20px] p-4 md:p-6 flex flex-col gap-4">
                            <div className="flex w-[60px] h-[60px] md:w-[80px] md:h-[80px] justify-center items-center bg-[#29397e] rounded-full shadow-md">
                                <div className="w-[36.923px] h-[36.923px] bg-cover" style={{ backgroundImage: `url(${featureIcons[index]})` }} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-inter text-[20px] md:text-[25px] font-medium text-white">{feature.title}</span>
                                <span className="font-inter text-[14px] md:text-[16px] text-white">{feature.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyBookSection;