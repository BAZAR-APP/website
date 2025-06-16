// app/api/auth/[...nextauth]/route.ts
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Create axios instance for API calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NESTJS_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handler = NextAuth({
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

            // Store user data in the user object for JWT callback
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
      // Initial sign in - store user data in token
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.phoneNumber = user.phoneNumber
        token.email = user.email ?? undefined
        token.provider = account?.provider || ''
      }

      // Validate token on subsequent requests (but not on initial sign in)
      if (token.accessToken && trigger !== 'signIn') {
        try {
          await apiClient.get('/users/currentUser', {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })

          // Token is valid, continue with current token
          return token
        } catch (error: any) {

          // Token is invalid/expired, clear the token
          return {
            ...token,
            id: '',
            accessToken: undefined,
            phoneNumber: undefined,
            provider: undefined,
            email: undefined,
          }
        }
      }

      return token
    },

    async session({ session, token }) {
      // If token is empty (expired/invalid), return null session
      if (!token.id || !token.accessToken) {
        return {
          ...session,
          user: undefined,
        }
      }

      try {
        // Get current user details from API
        const response = await apiClient.get('/users/currentUser', {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })

        const userData = response.data

        // Build session with API data and token info
        session.user = {
          id: token.id,
          accessToken: token.accessToken,
          provider: token.provider,
          email: token.email,
          phoneNumber: token.phoneNumber,
          ...userData, // Spread all user data from API
        }

        return session
      } catch (error: any) {

        return {
          ...session,
          user: undefined,
        }
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
})

export { handler as GET, handler as POST }
