// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      accessToken?: string
      provider?: string
      email?: string
      phoneNumber?: string
      name?: string
      userTierType?: string
      role: string
      [key: string]: any
    }
  }

  interface User {
    id: string
    accessToken?: string
    phoneNumber?: string
    provider?: string
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    accessToken?: string
    phoneNumber?: string
    provider?: string
    email?: string
    lastValidated?: number
    isInvalid?: boolean
  }
}
