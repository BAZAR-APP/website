import Image from 'next/image';
import React from 'react';

interface ProfileBillingCardProps {
    imageUrl: string;
    title: string;
    location: string;
    locationIconUrl: string;
    dateRange: string;
    dateIconUrl: string;
    paymentDate: string;
    paymentIconUrl: string;
    amount: string;
    paymentStatus: {
        text: string;
        color: 'pink' | 'emerald';
        iconUrl: string;
    };
    detailsLinkIconUrl: string;
    onViewDetails?: () => void;
}

export const ProfileBillingCard: React.FC<ProfileBillingCardProps> = ({
    imageUrl,
    title,
    location,
    locationIconUrl,
    dateRange,
    dateIconUrl,
    paymentDate,
    paymentIconUrl,
    amount,
    paymentStatus,
    detailsLinkIconUrl,
    onViewDetails
}) => {
    const statusColors = {
        pink: {
            text: 'text-[#EC4899]',
            bg: 'bg-[#FCE7F3]'
        },
        emerald: {
            text: 'text-[#10B981]',
            bg: 'bg-[#D1FAE5]'
        }
    };

    const statusStyle = statusColors[paymentStatus.color];

    return (
        <article className="items-center flex flex-col md:flex-row md:min-w-60 max-w-[615px] gap-6 flex-wrap bg-gray-50 p-3 rounded-2xl">
            <div className="self-stretch min-w-60 overflow-hidden w-[276px] my-auto rounded-xl">
                <Image
                    src={imageUrl}
                    alt={title}
                    className="aspect-[1.5] object-contain w-full"
                    width={276}
                    height={276}

                />
            </div>
            <div className="self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto">
                <header className="flex w-full gap-6 font-normal">
                    <div className="flex min-w-60 w-full flex-col items-stretch flex-1 shrink basis-[0%]">
                        <h3 className="text-[#484A4C] text-xl">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-[#8e8e93] mt-2">
                            <Image
                                src={locationIconUrl}
                                alt="Location icon"
                                className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                                width={12}
                                height={12}
                            />
                            <span className="self-stretch my-auto">
                                {location}
                            </span>
                        </div>
                    </div>
                </header>

                <div className="flex w-full items-center gap-[5px] text-sm text-[#9EA0A2] font-normal mt-4">
                    <Image
                        src={dateIconUrl}
                        alt="Date icon"
                        className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                        width={20}
                        height={20}
                    />
                    <span className="text-[#9EA0A2] self-stretch flex-1 shrink basis-[0%] my-auto">
                        {dateRange}
                    </span>
                </div>

                <div className="flex w-full items-center gap-[5px] text-sm text-[#9EA0A2] font-normal mt-4">
                    <Image
                        src={paymentIconUrl}
                        alt="Payment icon"
                        className="aspect-[1] object-contain w-5 self-stretch shrink-0 my-auto"
                        width={20}
                        height={20}
                    />
                    <span className="text-[#9EA0A2] self-stretch flex-1 shrink basis-[0%] my-auto">
                        {paymentDate}
                    </span>
                </div>

                <footer className="flex flex-col md:flex-row w-full items-center gap-[40px_50px] justify-between mt-4">
                    <div className="self-stretch flex items-center gap-2 text-lg text-[#484A4C] font-medium leading-loose w-[145px] my-auto">
                        <span className="text-[#484A4C] self-stretch gap-2 my-auto flex items-center">
                            <Image src={"/images/VisaCard.svg"} alt="Visa Card" width={32} height={22} className="aspect-[1] object-contain self-stretch shrink-0 my-auto" />
                            {amount}
                        </span>
                    </div>
                    <div className={`justify-center items-center self-stretch flex gap-0.5 text-sm font-normal text-center my-auto px-1.5 py-1 rounded-md ${statusStyle.text} ${statusStyle.bg}`}>
                        <Image
                            src={paymentStatus.iconUrl}
                            alt="Status icon"
                            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                            width={20}
                            height={20}
                        />
                        <span className={`self-stretch my-auto ${statusStyle.text}`}>
                            {paymentStatus.text}
                        </span>
                    </div>
                </footer>

                <button
                    onClick={onViewDetails}
                    className="flex w-[188px] max-w-full items-center gap-1 text-sm text-[#29397E] font-medium mt-4 cursor-pointer transition-opacity"
                >
                    <span className="text-[#29397E] self-stretch my-auto underline">
                        View Billing Details Page
                    </span>
                    <Image
                        src={detailsLinkIconUrl}
                        alt="Arrow icon"
                        className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </article>
    );
};

export default ProfileBillingCard