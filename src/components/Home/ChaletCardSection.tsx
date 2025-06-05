'use client';

import { useRouter } from 'next/navigation';
import { Grid } from '@radix-ui/themes';
import { HomeChaltesData } from '@/lib/constant';
import { PropertyCard } from '@/components';

interface ChaletsCardProps {
    title: string;
}

const ChaletsCard: React.FC<ChaletsCardProps> = ({ title }) => {
    const router = useRouter();

    return (
        <section className="flex w-full flex-col items-center box-border bg-white gap-24 px-0 py-0 max-md:gap-16 max-md:px-10 max-md:py-16 max-sm:gap-12 max-sm:px-4 max-sm:py-8">
            <div className="flex flex-col items-start gap-12 w-full px-4 md:px-5  max-w-screen-xl">
                <h1 className="w-full text-black text-[32px] md:text-[39px] font-semibold">
                    {title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {HomeChaltesData.map((property) => (
                        <PropertyCard
                            key={property.id}
                            {...property}
                            onClick={() => router.push(`/explore/chalets/${property.id}`)}
                            member
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChaletsCard;