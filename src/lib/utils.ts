import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserNameInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/' },
  { label: 'My Bookings', href: '/' },
  { label: 'Loyalty Points', href: '/' },
]

export const fields = [
  { label: 'Location', placeholder: 'Where are you going?' },
  { label: 'Check in', placeholder: 'Add dates' },
  { label: 'Check out', placeholder: 'Add dates' },
  { label: 'Guests', placeholder: 'Add guests' },
]

export const locations = [
  'Al Khobar',
  'Brasiler',
  'Al Jubail',
  'Zour',
  'Fahaheel',
  'Abu Al Hasaniya',
  'Al Mangaf',
]

export const amenities = [
  'Kitchen',
  'Wi-Fi',
  'Air conditioning / Heating',
  'Parking',
  'TV / Streaming services',
  'Clean towels and bed linens',
  'Toiletries (soap, shampoo)',
  'Private pool',
  'Outdoor grill',
]

export const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_low', label: 'Low to High' },
  { value: 'price_high', label: 'High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
]

export const mockProperties = [
  {
    id: 1,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 2,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 3,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 4,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 5,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 6,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 7,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 8,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  {
    id: 9,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
]

export const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
  const showPages = 5
  const pages: number[] = []

  let start = Math.max(1, currentPage - Math.floor(showPages / 2))
  let end = start + showPages - 1

  if (end > totalPages) {
    end = totalPages
    start = Math.max(1, end - showPages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

export const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Explore', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
]
export const reviews = [
  {
    name: 'Sarah Johnson',
    date: 'March 2024',
    rating: 5,
    comment:
      'Absolutely stunning property with breathtaking lake views. The house was spotlessly clean and had everything we needed for a perfect getaway.',
  },
  {
    name: 'Michael Chen',
    date: 'February 2024',
    rating: 5,
    comment:
      'Perfect location for a peaceful retreat. The amenities were top-notch and the host was incredibly responsive and helpful.',
  },
  {
    name: 'Emily Davis',
    date: 'January 2024',
    rating: 5,
    comment:
      'This place exceeded our expectations in every way. The lakeside setting is magical and the house is beautifully designed.',
  },
]

export const propertyData = {
  title: 'Luxury Lakeside Retreat',
  location: 'Lake Tahoe, California',
  rating: 4.7,
  reviewCount: 200,
  price: 450,
  images: [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
  ],
  description:
    'Escape to this stunning lakeside retreat featuring panoramic lake views, modern amenities, and serene surroundings. Perfect for a romantic getaway or peaceful family vacation.',
  maxGuests: 6,
  bedrooms: 3,
  bathrooms: 2,
  beds: 2,
  points: 200,
  amenities: [
    { icon: 'Wifi', label: 'Free WiFi' },
    { icon: 'Car', label: 'Free parking' },
    { icon: 'Waves', label: 'Lake access' },
    { icon: 'Coffee', label: 'Coffee maker' },
    { icon: 'Tv', label: 'Smart TV' },
    { icon: 'Wind', label: 'Air conditioning' },
    { icon: 'Utensils', label: 'Full kitchen' },
    { icon: 'MapPin', label: 'Great location' },
  ],
  packageOptions: [
    {
      id: 'standard',
      label: '100 KWD / night',
      basePrice: 100,
      weekendPrice: 300,
      weekdayPrice: 500,
      fullWeekPrice: 1000,
      fullMonthPrice: 3000,
    },
    {
      id: 'premium',
      label: '150 KWD / night',
      basePrice: 150,
      weekendPrice: 450,
      weekdayPrice: 750,
      fullWeekPrice: 1500,
      fullMonthPrice: 4500,
    },
    {
      id: 'luxury',
      label: '200 KWD / night',
      basePrice: 200,
      weekendPrice: 600,
      weekdayPrice: 1000,
      fullWeekPrice: 2000,
      fullMonthPrice: 6000,
    },
  ],
  bookingConfig: {
    refundableDeposit: 200,
    currency: 'KWD',
    paymentOptions: {
      partialPayment: true,
      partialPercentage: 50,
      fullPaymentUpfront: true,
    },
    refundPolicy: {
      depositAmount: 200,
      refundTimeframe: 72,
      currency: 'KD',
    },
  },
}
export const chaletRules = {
  title: 'Chalet Rules for a Great Stay',
  checkInOut: {
    checkIn: '02:00 PM',
    checkout: '12:00 PM',
  },
  healthStandards: [
    { id: 'smoke-alarm', title: 'Smoke alarm' },
    {
      id: 'security-deposit',
      title:
        'Security Deposit: You may be charged up to 200 KD if any damage occurs during your stay.',
    },
  ],
  chaletStandards: [
    {
      id: 'cleanliness',
      title:
        'Maintain the cleanliness of the chalet and return it in the same condition it was received.',
    },
    {
      id: 'pool-rules',
      title:
        'Keep the swimming pool clean and avoid using the swimming pool without showering first.',
    },
  ],
  cancellationPolicy: {
    title: 'Cancellation and Refund Policy',
    description: 'Refunds are available if you choose the refundable option',
    refundTimeEstimate: 'Refund Time Estimate Within 72 Hours',
  },
}
export const priceDetails = [
  { label: '100 KD x 4 nights', amount: '400 KWD' },
  { label: 'Refundable Deposit', amount: '200 KWD' },
  { label: 'Flower Arrangement', amount: '30 KWD' },
]
