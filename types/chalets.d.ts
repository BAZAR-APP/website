export interface Chalet {
  id: string;
  title: string;
  description: string;
  noOfBedrooms: string;
  maxNoOfBeds: string;
  noOfBaths: string;
  maxNoOfGuests: string;
  minNoOfGuests: string;
  isEntireHomeAvailabe: boolean;
  perHourCost: number;
  perNightCost: number;
  weekendCost: number;
  weekDaysCost: number;
  fullWeekCost: number;
  fullMonthCost: number;
  status: string;
  photoId: string;
  galleryPhotoIds: string[];
  trustedByPlatform: boolean;
  hostId: string;
  isFamilyFriendlyOnly: boolean;
  latitude: number;
  longitude: number;
  pinTitle: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  amenities: Amenity[];
  viewTypes: ViewType[];
  badgeId: string;
  badge: Badge;
  createdAt: string; // or Date
  updatedAt: string; // or Date
}

export interface Amenity {
  id: string;
  title: string;
  hasCustomizedIcon: boolean;
  iconTitle: string | null;
  iconPhotoId: string;
  status: string;
}

export interface ViewType {
  id: string;
  title: string;
  hasCustomizedIcon: boolean;
  iconTitle: string | null;
  iconPhotoId: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
}

export type ChaletResponse = Chalet[]
