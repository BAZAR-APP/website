'use client'
import { useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PropertyCard } from '@/components'
import { Chalet } from '../../../types/chalets'
import api from '@/lib/axios'
import clsx from 'clsx'
import { Grid } from '@radix-ui/themes'
import { PropertyCardSkeleton } from '../Skeletons/chaletsCardSkeleton'
import { useRouter } from 'next/navigation'
import { useBookingStore } from '../../../stores/useBookingStore'
import { useSession } from 'next-auth/react'
import { Locale } from '../../../i18n.config'

interface ChaletsCardProps {
  title: string
  endpoint: string
  queryKey: string
  lang: Locale
}

interface ChaletsResponse {
  data: Chalet[]
  total: number
  page: number
  hasMore: boolean
}

const ChaletsCard: React.FC<ChaletsCardProps> = ({ title, endpoint, queryKey, lang }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { resetBooking } = useBookingStore()

  const [isScrollLoading, setIsScrollLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  const fetchChalets = async ({ pageParam = 1 }): Promise<ChaletsResponse> => {
    const res = await api.get(endpoint, {
      params: {
        limit: 20,
        page: pageParam,
        userId: session?.user?.id,
        language: lang
      },
    })

    const data = res.data?.data || []
    const total = res.data?.total || 0
    const currentPage = pageParam
    const hasMore = data.length === 20 && currentPage * 20 < total

    return {
      data,
      total,
      page: currentPage,
      hasMore,
    }
  }

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [queryKey, endpoint],
    queryFn: fetchChalets,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })

  const handleScroll = async () => {
    const el = scrollRef.current
    if (
      el &&
      el.scrollLeft + el.clientWidth >= el.scrollWidth - 10 &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isScrollLoading
    ) {
      setIsScrollLoading(true)
      await fetchNextPage()
      setIsScrollLoading(false)
    }
  }

  // Flatten all pages into a single array
  const allChalets = data?.pages.flatMap((page) => page.data) || []

  if (isLoading) {
    return (
      <>
        <h1 className="w-full text-black text-[32px] md:text-[39px] font-semibold">{title}</h1>
        <Grid columns={{ initial: '1', sm: '2', lg: '4', xl: '4' }} gap="4" width="100%">
          {Array.from({ length: 4 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </Grid>
      </>
    )
  }

  if (!allChalets.length) {
    return null
  }

  return (
    <section className="flex w-full flex-col items-center box-border bg-white gap-24 px-0 py-0 max-md:gap-16 max-md:py-16 max-sm:gap-12 max-sm:py-8">
      <div className="flex flex-col items-start gap-12 w-full">
        <h1 className="w-full text-black text-[32px] md:text-[39px] font-semibold">{title}</h1>

        <div
          className={clsx(
            'flex justify-start overflow-x-auto gap-5',
            allChalets.length <= 3 ? 'w-auto' : 'w-full',
            allChalets.length <= 4 ? '2xl:w-auto' : '2xl:w-full',
          )}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {allChalets.map((chalet, index) => (
            <PropertyCard
              chalet={chalet}
              onClick={() => {
                resetBooking()
                router.push(`/chalet/${chalet?.id}`)
              }}
              key={chalet.id || `${queryKey}-${index}`}
              isMember={true}
            />
          ))}

          {/* Loading indicator for pagination */}
          {isFetchingNextPage && (
            <div className="flex items-center justify-center w-64 h-80">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ChaletsCard
