
import React from 'react';
import { CityCard } from "@/components"

interface Destination {
    id: string;
    imageUrl: string;
    cityName: string;
    altText?: string;
}

const destinations: Destination[] = [
    {
        id: '1',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9802943a6c0a7834af4dad71295eb697e86dc233?placeholderIfAbsent=true',
        cityName: 'Al Khairan',
        altText: 'Al Khairan destination'
    },
    {
        id: '2',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f3d39cca11ea1939f2adb1272c7819fa4e34bc6?placeholderIfAbsent=true',
        cityName: 'Zour',
        altText: 'Zour destination'
    },
    {
        id: '3',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/366610ec614c98bf841302435dc8d7ff563ae9f4?placeholderIfAbsent=true',
        cityName: 'Al Mangaf',
        altText: 'Al Mangaf destination'
    },
    {
        id: '4',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/49e1efacf649633663a89bfaa682d7b3beab8417?placeholderIfAbsent=true',
        cityName: 'Bnaider',
        altText: 'Bnaider destination'
    },
    {
        id: '5',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4d7c4889e01801d9506a2ce19cda7ee99bd8b2e0?placeholderIfAbsent=true',
        cityName: 'Abu Al Hasaniya',
        altText: 'Abu Al Hasaniya destination'
    },
    {
        id: '6',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/43c8d9e6828d62cd64f8358ec694db1c37733465?placeholderIfAbsent=true',
        cityName: 'Al Julai\'a',
        altText: 'Al Julai\'a destination'
    },
    {
        id: '7',
        imageUrl: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6a9da7e884ace2e248e66a27d509dca0631564e2?placeholderIfAbsent=true',
        cityName: 'Fahaheel',
        altText: 'Fahaheel destination'
    }
];

const DestinationSection: React.FC = () => {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <section
                className="flex flex-col items-center gap-24 box-border bg-white py-24 max-md:gap-16 max-md:py-16 max-sm:gap-12 max-sm:py-12"
                aria-labelledby="destinations-heading"
            >
                <div className="flex flex-col items-start gap-12 px-4 md:px-5 max-w-screen-xl">
                    <h1
                        id="destinations-heading"
                        className="w-full text-black text-[32px] md:text-[39px] font-semibold"
                    >
                        Discover Your Next Destination
                    </h1>
                    <div
                        className="grid grid-cols-4 gap-4 w-full max-md:grid-cols-2 max-sm:grid-cols-1"
                        role="list"
                        aria-label="Available destinations"
                    >
                        {destinations.map((destination) => (
                            <div key={destination.id} role="listitem">
                                <CityCard
                                    imageUrl={destination.imageUrl}
                                    cityName={destination.cityName}
                                    altText={destination.altText}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default DestinationSection;