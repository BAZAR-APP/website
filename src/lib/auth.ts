import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

// Create axios instance for API calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NESTJS_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        phoneNumber: { label: 'Phone Number' },
        password: { label: 'Password', type: 'password' },
        callingCode: { label: 'callingCode' },
        countryCode: { label: 'countryCode' },
      },
      async authorize(credentials) {
        try {
          const response = await apiClient.post('/auth/signIn', {
            phoneNumber: credentials?.phoneNumber,
            callingCode: credentials?.callingCode,
            countryCode: credentials?.countryCode,
            password: credentials?.password,
            authProvider: 'phone',
          })

          const responseData = response.data
          const user = responseData.user || responseData

          if (user?.userId) {
            return {
              id: user.userId.toString(),
              name: user.fullName,
              email: user.email || null,
              phoneNumber: user.phoneNumber,
              accessToken: user.accessToken,
            }
          }

          return null
        } catch (error: any) {
          console.error('Phone auth error:', error.response?.data || error.message)
          throw new Error(error.response?.data?.message || 'Login failed')
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const response = await apiClient.post('/auth/signUp', {
            googleId: profile?.sub,
            fullName: profile?.name,
            email: profile?.email,
            authProvider: 'google',
          })

          if (response.status === 200 || response.status === 201) {
            const userData = response.data

            user.id =
              userData.user?.userId?.toString() || userData.userId?.toString() || profile?.sub
            user.accessToken = userData.accessToken || userData.user?.accessToken
            user.email = profile?.email
            user.name = profile?.name

            return true
          }

          return false
        } catch (error: any) {
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.phoneNumber = user.phoneNumber
        token.email = user.email ?? undefined
        token.provider = account?.provider || ''
      }

      // Validate token on subsequent requests
      if (token.accessToken && trigger !== 'signIn') {
        try {
          await apiClient.get('/users/currentUser', {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })

          return token // token still valid
        } catch (error) {
          return {
            ...token,
            id: '',
            accessToken: undefined,
            phoneNumber: undefined,
            provider: undefined,
            email: undefined,
            isInvalid: true, // 👈 mark as invalid for session()
          }
        }
      }

      return token
    },

    async session({ session, token }) {
      if (!token.accessToken || token.isInvalid || !token.id) {
        // Instead of returning null, mark session as invalid
        session.user = {
          id: '',
          accessToken: undefined,
          provider: undefined,
          email: undefined,
          phoneNumber: undefined,
        }
        ;(session as any).invalid = true
        return session
      }

      try {
        const response = await apiClient.get('/users/currentUser', {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })

        const userData = response.data

        session.user = {
          id: token.id,
          accessToken: token.accessToken,
          provider: token.provider,
          email: token.email,
          phoneNumber: token.phoneNumber,
          ...userData,
        }

        return session
      } catch (error) {
        session.user = {
          id: '',
          accessToken: undefined,
          provider: undefined,
          email: undefined,
          phoneNumber: undefined,
        }
        ;(session as any).invalid = true
        return session
      }
    },
  },

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
