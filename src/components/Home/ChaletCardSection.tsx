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
        <section className="flex w-full flex-col items-center gap-24 box-border bg-white px-20 py-24 max-md:gap-16 max-md:px-10 max-md:py-16 max-sm:gap-12 max-sm:px-5 max-sm:py-8">
            <div className="flex flex-col items-start gap-12 w-full max-w-screen-xl">
                <h1 className="w-full text-black text-[39px] font-bold max-md:text-[32px] max-sm:text-[28px]">
                    {title}
                </h1>

                <Grid columns={{ initial: '1', md: '2', lg: '3', xl: '4' }} gap="5" width="100%">
                    {HomeChaltesData.map((property) => (
                        <PropertyCard
                            key={property.id}
                            {...property}
                            onClick={() => router.push(`/explore/chalets/${property.id}`)}
                        />
                    ))}
                </Grid>
            </div>
        </section>
    );
};

export default ChaletsCard;