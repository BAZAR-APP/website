export const getUserNameInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore/chalets' },
  // { label: 'My Bookings', href: '/' },
  { label: 'Loyalty Points', href: '/loyalty-program' },
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
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Explore', href: '/explore/chalets' },
  { label: 'Terms & Conditions', href: '/terms-conditions/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
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
  description: `Enjoy a relaxing stay at this spacious chalet, perfect for families and groups. It accommodates up to 5 guests, offering 3 cozy bedrooms, 5 comfortable beds, and 3 modern bathrooms. Whether you're looking to unwind or have fun, this chalet provides the perfect getaway.`,
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

// Home Page Data

export const HomeChaltesData = [
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
    price: 120,
    newPrice: 100,
    priceUnit: 'hour' as const,
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
    price: 130,
    newPrice: 110,
    priceUnit: 'hour' as const,
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
    price: 140,
    newPrice: 120,
    priceUnit: 'hour' as const,
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
    price: 150,
    newPrice: 125,
    priceUnit: 'hour' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
];



// Terms and Conditions

export const termsData = [
  {
    number: 1,
    title: 'Booking & Payment',
    content: [
      'A booking is considered confirmed only after successful payment.',
      'You may choose to pay in full or in two parts (50% upfront and the remaining 72 hours before check-in).',
      'If the remaining amount is not paid on time, the booking may be canceled without refund.',
    ],
  },
  {
    number: 2,
    title: 'Cancellation & Refunds',
    content: [
      'Refundable bookings can be canceled up to 72 hours before check-in for a full refund.',
      'Non-refundable bookings are not eligible for refunds.',
      'Refunds (if applicable) will be processed within 7 business days.',
    ],
  },
  {
    number: 3,
    title: 'Check-In & Check-Out',
    content: [
      'Check-in and check-out times are specified in your booking details.',
      'Early check-in or late check-out may incur additional fees and must be requested in advance.',
    ],
  },
  {
    number: 4,
    title: 'Use of Chalet',
    content: [
      'The number of guests must not exceed the booking limit.',
      'The chalet must be kept in good condition. Any damage may result in a charge of up to 200 KD from the security deposit.',
      'Parties, loud noise, or illegal activities are not allowed.',
    ],
  },
  {
    number: 5,
    title: 'Loyalty Program',
    content: [
      'Points are earned for every eligible booking and can be redeemed for discounts.',
      'Points are non-transferable and may expire if unused for 12 months.',
    ],
  },
  {
    number: 6,
    title: 'Add-Ons & Extras',
    content: [
      'Add-ons such as decorations, food packages, or early check-in must be selected during booking.',
      'Prices for add-ons are added to the total amount and are non-refundable after 72 hours before check-in.',
    ],
  },
  {
    number: 7,
    title: 'Privacy & Security',
    content: [
      'We value your privacy. Personal data is used only for booking, communication, and loyalty program purposes.',
      'Payment is processed securely through trusted third-party gateways.',
    ],
  },
  {
    number: 8,
    title: 'Changes to Terms',
    content: [
      'We reserve the right to update these terms at any time. Continued use of the platform means you accept any changes.',
    ],
  },
]
export const rooms = [
  { roomNumber: 1, bedType: 'Double Bed', bedCount: 1, imageSrc: '/images/Icon.svg' },
  { roomNumber: 2, bedType: 'Single Bed', bedCount: 2, imageSrc: '/images/Icon.svg' },
  { roomNumber: 3, bedType: 'King Bed', bedCount: 1, imageSrc: '/images/Icon.svg' },
  { roomNumber: 4, bedType: 'Twin Beds', bedCount: 2, imageSrc: '/images/Icon.svg' },
]
