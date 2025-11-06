import { useQueryBase } from '@/lib/axios'
import { Chalet } from '../../../types/chalets'
import PropertyCard from '../PropertyCard'
import { Grid } from '@radix-ui/themes'
import { PropertyCardSkeleton } from '../Skeletons/chaletsCardSkeleton'

interface ProfileChaletListingProps {
  messages: {
    no_chalets_found: string;
    try_adjusting_filters: string;
  };
}

const ProfileChaletListing: React.FC<ProfileChaletListingProps> = ({ messages }) => {
  const { data: res, isLoading } = useQueryBase({
    queryKey: ['favouriteChalets'],
    url: '/favouriteChalets/me',
  })

  const chalets = res?.data?.data as Chalet[]

  return (
    <>
      {isLoading ? (
        <Grid columns={{ initial: '1', sm: '2', lg: '3', xl: '4' }} gap="4" width="100%">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </Grid>
      ) : (
        <>
          {chalets && chalets?.length > 0 ? (
            <Grid columns={{ initial: '1', sm: '2', lg: '3', xl: '4' }} gap="4" width="100%">
              {chalets?.map((chalet: Chalet, index: number) => (
                <PropertyCard chalet={chalet} key={chalet?.id} />
              ))}
            </Grid>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-700">{messages.no_chalets_found}</h3>
              <p className="text-gray-500 mt-2">{messages.try_adjusting_filters}</p>
            </div>
          )}
        </>
      )}
    </>
  )
}
export default ProfileChaletListing
