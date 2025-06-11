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
          const response = await fetch(`${process.env.NESTJS_API_URL}/auth/signIn`, {
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

          if (user?.id) {
            return {
              id: user.id.toString(),
              name: user.fullName,
              email: user.email || null,
              phoneNumber: user.phoneNumber,
              accessToken: user.accessToken,
            }
          }

          return null
        } catch (err: any) {
          console.error('Authorize error:', err.message)
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
          const res = await fetch(`${process.env.NESTJS_API_URL}/auth/signUp`, {
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
            console.error('Failed to authenticate Google user:', await res.text())
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
          console.error('Google sign-in error:', err)
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account }) {
      console.log('JWT Callback:', { token, user, account })

      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.phoneNumber = user.phoneNumber
        token.email = user.email ?? undefined
        token.provider = account?.provider || ''
      }

      return token
    },

    async session({ session, token }) {
      console.log('Session Callback:', { session, token })

      try {
        // Make API call to get current user details for both providers
        if (token.accessToken) {
          const response = await fetch(`${process.env.NESTJS_API_URL}/users/currentUser`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              'Content-Type': 'application/json',
            },
          })

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
            throw new Error('Failed to fetch user data')
          }
        } else {
          throw new Error('No access token available')
        }
      } catch (error) {
        console.error('Session callback error:', error)

        // Fallback to token data if API call fails
        session.user = {
          id: token.id,
          name: session.user?.name,
          email: token.email || session.user?.email,
          phoneNumber: token.phoneNumber,
          provider: token.provider,
          accessToken: token.accessToken,
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
