'use client'
import { PropertyCard } from '@/components'
import { Chalet } from '../../../types/chalets'
import { useQueryBase } from '@/lib/axios'

interface ChaletsCardProps {
  title: string
  endpoint: string
  queryKey: string
}

const ChaletsCard: React.FC<ChaletsCardProps> = ({ title, queryKey, endpoint }) => {
  const { data: res } = useQueryBase({
    queryKey: [queryKey],
    url: endpoint,
  })
  const chalets = res?.data?.data as unknown as Chalet[]

  if (!chalets?.length) return
  return (
    <section className="flex w-full flex-col items-center box-border bg-white gap-24 px-0 py-0 max-md:gap-16 max-md:py-16 max-sm:gap-12 max-sm:py-8">
      <div className="flex flex-col items-start gap-12 w-full ">
        <h1 className="w-full text-black text-[32px] md:text-[39px] font-semibold">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {chalets &&
            chalets?.length > 0 &&
            chalets?.map((chalet: Chalet, index: number) => (
              <PropertyCard chalet={chalet} onClick={() => {}} key={index} isMember={true} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default ChaletsCard
