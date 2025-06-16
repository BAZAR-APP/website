// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

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
          const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/signIn`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumber: credentials?.phoneNumber,
              callingCode: credentials?.callingCode,
              countryCode: credentials?.countryCode,
              password: credentials?.password,
              authProvider: 'phone',
            }),
          })

          const responseBody = await response.json()

          if (!response.ok) throw new Error(responseBody.message || 'Login failed')

          const user = responseBody.user || responseBody

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
        } catch (err: any) {
          throw new Error(err.message)
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
          // For Google login, authenticate and get access token
          const res = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/auth/signUp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              googleId: profile?.sub,
              fullName: profile?.name,
              email: profile?.email,
              authProvider: 'google',
            }),
          })

          if (!res.ok) {
            return false
          }

          const userData = await res.json()

          // Store user data and access token for JWT callback
          user.id = userData.user?.id?.toString() || userData.id?.toString() || profile?.sub
          user.accessToken = userData.accessToken || userData.user?.accessToken
          user.email = profile?.email
          user.name = profile?.name

          return true
        } catch (err) {
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account, trigger }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.phoneNumber = user.phoneNumber
        token.email = user.email ?? undefined
        token.provider = account?.provider || ''
      }

      // Check token validity on each request
      if (token.accessToken && trigger !== 'signIn') {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/users/currentUser`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
                'Content-Type': 'application/json',
              },
            },
          )

          // If token is invalid/expired, clear the token
          if (!response.ok) {
            return {
              id: '',
              accessToken: undefined,
              phoneNumber: undefined,
              provider: undefined,
              email: undefined,
            } // Return empty JWT to force sign out
          }
        } catch (error) {
          return {
            id: '',
            accessToken: undefined,
            phoneNumber: undefined,
            provider: undefined,
            email: undefined,
          } // Return empty JWT to force sign out
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
        // Make API call to get current user details
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/users/currentUser`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )

        if (response.ok) {
          const userData = await response.json()

          // Use the API response data
          session.user = {
            id: token.id,
            accessToken: token.accessToken,
            provider: token.provider,
            ...userData, // Spread all user data from API
          }
        } else {
          return {
            ...session,
            user: undefined,
          }
        }
      } catch (error) {
        return {
          ...session,
          user: undefined,
        }
      }

      return session
    },
  },

  pages: {
    signIn: '/[lang]/login',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Add debug mode for development
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }
