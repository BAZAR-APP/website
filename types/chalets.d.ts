export interface Chalet {
  id: string
  title: string
  description: string
  noOfBedrooms: string
  maxNoOfBeds: string
  noOfBaths: string
  maxNoOfGuests: string
  noOfLoyalityPoints?: number
  minNoOfGuests: string
  isEntireHomeAvailabe: boolean
  isFreeParking?: boolean
  isFreeWifi?: boolean
  rating?:number
  noOfReviews?: number
  perHourCost: number
  perNightCost: number
  weekendCost: number
  weekDaysCost: number
  fullWeekCost: number
  fullMonthCost: number
  status: string
  photoId: string
  galleryPhotoIds: string[]
  trustedByPlatform: boolean
  hostId: string
  isFamilyFriendlyOnly: boolean
  latitude: number
  longitude: number
  pinTitle: string
  street1: string
  street2: string
  city: string
  state: string
  country: string
  postalCode: string
  amenities: Amenity[]
  isFavourite: boolean
  viewTypes: ViewType[]
  badgeId: string
  badge: Badge
  createdAt: string // or Date
  updatedAt: string // or Date
  host: {
    fullName: string
  }
  subscriptions: ChaletSubscription[]
  chaletRooms: ChaletBedroom[]
  isSelfCheckIn: boolean
  area: Number
  areaUnit: String
  galleryPhotoURLs: string[]
  photoURL: string
}

export interface Amenity {
  id: string
  title: string
  hasCustomizedIcon: boolean
  iconTitle: string | null
  iconPhotoId?: string
  iconPhotoUrl?: string | null
  status: string
}

export interface ViewType {
  id: string
  title: string
  hasCustomizedIcon: boolean
  iconTitle: string | null
  iconPhotoUrl?: string | null
  iconPhotoId: string
}

export interface Badge {
  id: string
  title: string
  description: string
}
export interface ChaletSubscription {
  id: string
  title: string
  durationUnit: string
  durationValue: string
  type: string
  price: string
  priceUnit: string
  minimumTime: string | null
  minimumTimeUnit: string | null
  specialTags: string[] | null
  forMembersOnly: boolean
  isSplitPaymentAvailable: boolean
  chaletId: string
  createdAt: string // or Date if you parse it
  updatedAt: string // or Date if you parse it
}
export interface ChaletBedroom {
  id: string
  title: string
  noOfKingBedrooms: string | null
  noOfSingleBedrooms: string | null
  noOfDoubleBedrooms: string | null
  chaletId: string
  createdAt: string // or Date
  updatedAt: string // or Date
}

export type ChaletResponse = {
  data: Chalet[]
  limit: number
  page: number
  total: number
}
