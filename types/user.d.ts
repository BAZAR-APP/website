export interface Discount {
  id: string
  name: string
  pointsRequired: number
  rewardType: 'DISCOUNT' | string
  discountPercent: number
  iconUrl: string
  couponCode: string
}