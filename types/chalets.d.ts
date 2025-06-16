export interface Chalet {
  title: string
  city: string
  latitude: number
  longitude: number
  photoId: string
  perHourCost: number
  perNightCost: number
  maxNoOfBeds: string
  noOfBaths: string
  noOfBedrooms: string
  amenities: {
    id: string
  }[]
  viewTypes: string[]
  maxNoOfGuests: string
  minNoOfGuests: string
  isEntireHomeAvailabe: boolean
}
export type ChaletResponse = Chalet[]
