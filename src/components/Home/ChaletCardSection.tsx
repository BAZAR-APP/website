'use client'
import { useEffect, useRef, useState } from 'react'
import { PropertyCard } from '@/components'
import { Chalet } from '../../../types/chalets'
import api from '@/lib/axios'

interface ChaletsCardProps {
  title: string
  endpoint: string
  queryKey: string
}

const ChaletsCard: React.FC<ChaletsCardProps> = ({ title, endpoint }) => {
  const [chalets, setChalets] = useState<Chalet[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchData = async () => {
    try {
      const res = await api.get(endpoint, {
        params: {
          limit: 20,
          page: page,
        },
      })

      const newChalets = res.data?.data || []
      const total = res.data?.total || 0

      setChalets((prev) => [...prev, ...newChalets])
      setHasMore(chalets.length + newChalets.length < total)
    } catch (error) {
      console.error('Error fetching chalets:', error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleScroll = () => {
    const el = scrollRef.current
    if (el && el.scrollLeft + el.clientWidth >= el.scrollWidth - 10 && hasMore) {
      setPage((prev) => prev + 1)
    }
  }
  if (!chalets?.length) return

  return (
    <section className="flex w-full flex-col items-center box-border bg-white gap-24 px-0 py-0 max-md:gap-16 max-md:py-16 max-sm:gap-12 max-sm:py-8">
      <div className="flex flex-col items-start gap-12 w-full">
        <h1 className="w-full text-black text-[32px] md:text-[39px] font-semibold">{title}</h1>

        <div className="flex justify-start overflow-x-auto gap-5 sm:w-auto w-full" ref={scrollRef} onScroll={handleScroll}>
          {chalets.map((chalet, index) => (
            <PropertyCard chalet={chalet} onClick={() => {}} key={index} isMember={true} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChaletsCard
