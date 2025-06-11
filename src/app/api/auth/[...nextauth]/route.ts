// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextRequest } from 'next/server'

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
          const response = await fetch('http://localhost:4000/auth/signIn', {
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

          if (!response.ok) {
            console.error('Login failed:', responseBody)
            // Attach custom error message for display in frontend
            throw new Error(responseBody.message || 'Login failed')
          }

          const user = responseBody.user || responseBody

          if (user && user.id) {
            return {
              id: user.id,
              name: user.fullName,
              phoneNumber: user.phoneNumber,
              accessToken: user.accessToken,
            }
          }

          return null
        } catch (err: any) {
          console.error('Authorize error:', err.message)
          // Re-throw so NextAuth can forward it to the frontend
          throw new Error(err.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user data to the token
      if (user) {
        // token.accessToken = user.accessToken
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Send token data to the client
      //   session.accessToken = token.accessToken
      //   session.user.id = token.id
      return session
    },
  },
  pages: {
    signIn: '/login', // Your custom login page
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
