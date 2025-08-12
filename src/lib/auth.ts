import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import AppleProvider from 'next-auth/providers/apple'
import axios from 'axios'

// Create axios instance for API calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NESTJS_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://") ?? false
const cookiePrefix = useSecureCookies ? "__Secure-" : ""

// Helper function to validate current user
async function validateCurrentUser(accessToken: string) {
  try {
    const response = await apiClient.get('/users/currentUser', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return { isValid: true, userData: response.data }
  } catch (error) {
    return { isValid: false, userData: null }
  }
}

// Helper function to check if user role is customer
function isCustomerRole(role: string): boolean {
  return role?.toLowerCase() === 'customer'
}

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

          if (user?.userId && user?.accessToken) {
            // Validate the user immediately after login
            const validation = await validateCurrentUser(user.accessToken)

            if (!validation.isValid) {
              throw new Error('User validation failed after login')
            }

            // Check if user role is customer
            const userRole = validation.userData?.role || user.role
            if (!isCustomerRole(userRole)) {
              throw new Error('Access denied. Only customers can login to this application.')
            }

            return {
              id: user.userId.toString(),
              name: user.fullName,
              email: user.email || null,
              phoneNumber: user.phoneNumber,
              accessToken: user.accessToken,
              role: userRole,
            }
          }

          return null
        } catch (error: any) {
          throw new Error(error.response?.data?.message || error.message || 'Login failed')
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
      authorization: {
        params: {
          scope: "name email",
          response_mode: "form_post", // Apple requires form_post
        }
      },
    }),
  ],

  // Properly configure cookies for OAuth flows
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies,
      }
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies,
      }
    },
    csrfToken: {
      name: `${cookiePrefix}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies,
      }
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 60 * 15 // 15 minutes
      }
    },
    state: {
      name: `${cookiePrefix}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 60 * 15 // 15 minutes
      }
    },
    nonce: {
      name: `${cookiePrefix}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies,
      }
    }
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { provider: account?.provider, user, profile })

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
            const accessToken = userData.accessToken || userData.user?.accessToken

            if (accessToken) {
              // Validate the user immediately after Google signup
              const validation = await validateCurrentUser(accessToken)

              if (!validation.isValid) {
                console.error('Google user validation failed')
                return false
              }

              // Check if user role is customer
              const userRole = validation.userData?.role || userData.user?.role || userData.role
              if (!isCustomerRole(userRole)) {
                console.error('Google user is not a customer')
                return false
              }

              user.id =
                userData.user?.userId?.toString() || userData.userId?.toString() || profile?.sub
              user.accessToken = accessToken
              user.email = profile?.email
              user.name = profile?.name
              user.role = userRole

              return true
            }
          }

          return false
        } catch (error: any) {
          console.error('Google sign-in error:', error.response?.data || error.message)
          return false
        }
      }

      if (account?.provider === 'apple') {
        console.log('Apple sign-in attempt:', { profile, user, account })

        try {
          const response = await apiClient.post('/auth/signUp', {
            appleId: profile?.sub,
            fullName: profile?.name || user.name,
            email: profile?.email || user.email,
            authProvider: 'apple',
          })

          console.log('Apple API response:', response.data)

          if (response.status === 200 || response.status === 201) {
            const userData = response.data
            const accessToken = userData.accessToken || userData.user?.accessToken

            if (accessToken) {
              const validation = await validateCurrentUser(accessToken)
              if (!validation.isValid) {
                console.error('Apple user validation failed')
                return false
              }
              const userRole = validation.userData?.role || userData.user?.role || userData.role
              if (!isCustomerRole(userRole)) {
                console.error('Apple user is not a customer')
                return false
              }
              user.id =
                userData.user?.userId?.toString() || userData.userId?.toString() || profile?.sub
              user.accessToken = accessToken
              user.email = profile?.email || user.email
              user.name = profile?.name || user.name
              user.role = userRole
              return true
            }
          }

          return false
        } catch (error: any) {
          console.error('Apple sign-in error:', error.response?.data || error.message)
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account, trigger }) {
      if (user && account) {
        token.id = user.id
        token.accessToken = (user as any).accessToken
        token.phoneNumber = (user as any).phoneNumber
        token.email = user.email ?? undefined
        token.role = (user as any).role
        token.provider = account.provider || ''
        token.lastValidated = Date.now()
        return token
      }

      // For subsequent requests, validate the token periodically
      if (token.accessToken && token.id) {
        const now = Date.now()
        const lastValidated = typeof token.lastValidated === 'number' ? token.lastValidated : 0
        const validationInterval = 5 * 60 * 1000 // 5 minutes

        // Only validate if it's been more than 5 minutes since last validation
        // or if this is not the initial sign-in
        if (trigger !== 'signIn' && now - lastValidated > validationInterval) {
          const validation = await validateCurrentUser(token.accessToken as string)

          if (!validation.isValid) {
            // Clear token data but maintain JWT structure
            token.id = undefined
            token.accessToken = undefined
            token.phoneNumber = undefined
            token.provider = undefined
            token.email = undefined
            token.role = undefined
            token.isInvalid = true
            return token
          }

          // Re-check role on validation
          const userRole = validation.userData?.role
          if (!isCustomerRole(userRole)) {
            // Role changed and no longer customer - invalidate session
            token.id = undefined
            token.accessToken = undefined
            token.phoneNumber = undefined
            token.provider = undefined
            token.email = undefined
            token.role = undefined
            token.isInvalid = true
            return token
          }

          // Update last validated timestamp and role
          token.lastValidated = now
          token.role = userRole
        }
      }

      return token
    },

    async session({ session, token }) {
      // If token is marked as invalid or missing required fields, return invalid session
      if (!token.accessToken || token.isInvalid || !token.id) {
        return {
          ...session,
          user: {
            id: undefined,
            accessToken: undefined,
            provider: undefined,
            email: undefined,
            phoneNumber: undefined,
            role: undefined,
          },
          expires: new Date(0).toISOString(), // Expired session
        }
      }

      // Always validate current user for session creation
      const validation = await validateCurrentUser(token.accessToken as string)

      if (!validation.isValid) {
        return {
          ...session,
          user: {
            id: undefined,
            accessToken: undefined,
            provider: undefined,
            email: undefined,
            phoneNumber: undefined,
            role: undefined,
          },
          expires: new Date(0).toISOString(), // Expired session
        }
      }

      // Final role check during session creation
      const userRole = validation.userData?.role
      if (!isCustomerRole(userRole)) {
        return {
          ...session,
          user: {
            id: undefined,
            accessToken: undefined,
            provider: undefined,
            email: undefined,
            phoneNumber: undefined,
            role: undefined,
          },
          expires: new Date(0).toISOString(), // Expired session
        }
      }

      // Build valid session with current user data
      session.user = {
        id: token.id as string,
        accessToken: token.accessToken as string,
        provider: token.provider as string,
        email: token.email as string,
        phoneNumber: token.phoneNumber as string,
        role: userRole,
        ...validation.userData, // Include fresh user data from API
      }

      return session
    },
  },

  pages: {
    signIn: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },

  // Important: Use secure cookies in production
  useSecureCookies,

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}
