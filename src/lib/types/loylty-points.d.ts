export interface LoyaltyPointsPackages {
  id: string
  points: number
  price: string // Can be changed to number if needed
  unit: string
  discount: string // e.g. "10%", but if numeric calculation is needed, consider separating value and symbol
  discountType: 'percentage' | 'fixed' // assuming only these two types
  isActive: boolean
}
