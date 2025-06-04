import React from 'react';

interface TierData {
    id: string;
    title: string;
    backgroundColor: string;
    iconSrc: string;
    iconAlt: string;
    benefits: string[];
    className?: string;
}

const LoyaltyTiersCardSection: React.FC = () => {
    const tiers: TierData[] = [
        {
            id: 'platinum',
            title: 'Platinum (0 – 499 points)',
            backgroundColor: '#9EA0A2',
            iconSrc: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/e7e3e685c9bbd62fa0450104b72e9ed1c97c09c5?placeholderIfAbsent=true',
            iconAlt: 'Platinum tier icon',
            benefits: [
                'Earn 8 points per 1 KWD',
                'Priority support',
                '',
                ''
            ],
            className: 'min-h-[214px] w-[304px]'
        },
        {
            id: 'gold',
            title: 'Gold (500 – 999 points)',
            backgroundColor: '#FC0',
            iconSrc: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/06f58c21d3fb8dce0b501057b0c39924f95777fa?placeholderIfAbsent=true',
            iconAlt: 'Gold tier icon',
            benefits: [
                'Earn 27 points per 1 KWD',
                'Priority support',
                'Discount booster (up to 20% off)',
                '24/7 premium contact support'
            ],
            className: 'min-h-[214px] w-[291px]'
        },
        {
            id: 'diamond',
            title: 'Diamond (+1,000 points)',
            backgroundColor: '#19191A',
            iconSrc: 'https://cdn.builder.io/api/v1/image/assets/1b3d434ba2184846a69efe8753eda104/e681132d67d4577485833ad7101b32bc609b70ba?placeholderIfAbsent=true',
            iconAlt: 'Diamond tier icon',
            benefits: [
                'Earn 36 points per 1 KWD',
                'Priority support',
                'Flexible check-in and check-out (upon availability)',
                'Discount booster (up to 20% off)',
                'Favorite chalet priority booking',
                '24/7 premium contact support'
            ],
            className: 'w-[403px] max-md:max-w-full'
        }
    ];

    const TierIcon = ({ src, alt }: { src: string; alt: string }) => (
        <div className="justify-center items-center self-stretch flex min-h-16 gap-2 w-16 h-16 bg-gray-100 my-auto px-2 rounded-[32px]">
            <img
                src={src}
                alt={alt}
                className="aspect-[1] object-contain w-10 self-stretch my-auto"
            />
        </div>
    );

    const TierBenefits = ({ benefits }: { benefits: string[] }) => (
        <div className="text-[#FDFDFE] text-sm font-normal mt-4">
            {benefits.map((benefit, index) => (
                <React.Fragment key={index}>
                    {benefit}
                    {index < benefits.length - 1 && <br />}
                </React.Fragment>
            ))}
        </div>
    );

    const TierCard = ({ tier }: { tier: TierData }) => (
        <article className={`flex-1 ${tier.className}`}>
            <div
                className="flex flex-col p-4 rounded-2xl h-full"
                style={{ backgroundColor: tier.backgroundColor }}
            >
                <div className="flex items-center gap-4">
                    <TierIcon src={tier.iconSrc} alt={tier.iconAlt} />
                    <h2 className="text-[#FDFDFE] text-xl font-semibold leading-[1.6]">
                        {tier.title}
                    </h2>
                </div>
                <TierBenefits benefits={tier.benefits} />
            </div>
        </article>
    );

    return (
        <section className="w-full" aria-labelledby="loyalty-tiers-heading">
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-6 flex-wrap justify-center">
                    {tiers.map((tier) => (
                        <TierCard key={tier.id} tier={tier} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LoyaltyTiersCardSection;