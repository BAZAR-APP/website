import { Button } from "@/components";

interface ChatHeroProps {
  messages: {
    heading: string;
    description: string;
    button_text: string;
  };
}

const ChatHero: React.FC<ChatHeroProps> = ({ messages }) => {

    return (
        <section
            className="items-stretch flex flex-col text-white justify-center bg-white px-16 py-24 max-md:px-5 "
            aria-label="Customer support hero section"
        >
            <div className="flex flex-col relative min-h-[367px] w-full overflow-hidden px-20 py-24 rounded-[20px] mx-auto md:rounded-[40px] max-md:px-5">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/e30be3687dc943ec8d288bcaad11a57e98b49ddf?placeholderIfAbsent=true"
                    alt="Customer support background"
                    className="absolute h-full w-full object-cover inset-0"
                />
                <section className="relative  ">
                    <h1 className="text-[32px] md:text-[39px] font-semibold max-md:max-w-full">
                        {messages.heading}
                    </h1>
                    <p className="text-xl font-normal mt-4 max-md:max-w-full">
                        {messages.description}
                    </p>

                    <div className="relative mt-4">
                        <Button
                            className="rounded-[8px] text-base font-medium bg-[#29397E] text-white  px-5 py-3 w-[196px] max-w-full"
                            aria-label="Start chat with customer support"
                        >
                            {messages.button_text}
                        </Button>
                    </div>
                </section>
            </div >
        </section >
    );
};

export default ChatHero;
