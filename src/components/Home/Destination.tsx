
import React from 'react';
import { CityCard } from "@/components"

interface Destination {
    id: string;
    cityName: string;
}

interface DestinationSectionProps {
  messages: {
    heading: string;
    destinations: Destination[];
  };
}

const destinationAssets: Record<string, { imageUrl: string; altText: string }> = {
  "1": {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/9802943a6c0a7834af4dad71295eb697e86dc233?placeholderIfAbsent=true",
    altText: "Al Khairan destination"
  },
  "2": {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f3d39cca11ea1939f2adb1272c7819fa4e34bc6?placeholderIfAbsent=true",
    altText: "Zour destination"
  },
  "3": {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/366610ec614c98bf841302435dc8d7ff563ae9f4?placeholderIfAbsent=true",
    altText: "Al Mangaf destination"
  },
  "4": {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/49e1efacf649633663a89bfaa682d7b3beab8417?placeholderIfAbsent=true",
    altText: "Bnaider destination"
  },
  "5": {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/4d7c4889e01801d9506a2ce19cda7ee99bd8b2e0?placeholderIfAbsent=true",
    altText: "Abu Al Hasaniya destination"
  },
  "6": {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/43c8d9e6828d62cd64f8358ec694db1c37733465?placeholderIfAbsent=true",
    altText: "Al Julai'a destination"
  },
  "7": {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/6a9da7e884ace2e248e66a27d509dca0631564e2?placeholderIfAbsent=true",
    altText: "Fahaheel destination"
  }
};

const DestinationSection: React.FC<DestinationSectionProps> = ({ messages }) => {
    return (
        <>
            <section
                className="flex flex-col gap-24 box-border md:px-16 max-md:px-5 bg-white py-24 max-md:gap-16 max-md:py-16 max-sm:gap-12 max-sm:py-12"
                aria-labelledby="destinations-heading"
            >
                <div className="flex flex-col items-start gap-12">
                    <h1
                        id="destinations-heading"
                        className="w-full text-black text-[32px] md:text-[39px] font-semibold"
                    >
                       {messages.heading}
                    </h1>
                    <div
                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-md:grid-cols-2 max-sm:grid-cols-1"
                        role="list"
                        aria-label="Available destinations"
                    >
                        {messages.destinations.map((dest) => {
                            const asset = destinationAssets[dest.id];
                            return (
                            <div key={dest.id} role="listitem">
                                <CityCard
                                imageUrl={asset.imageUrl}
                                cityName={dest.cityName} 
                                altText={asset.altText}
                                />
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default DestinationSection;