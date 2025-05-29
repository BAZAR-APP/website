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
