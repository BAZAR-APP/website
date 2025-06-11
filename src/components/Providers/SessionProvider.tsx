"use client"
import React, { FC } from 'react'
import { SessionProvider } from 'next-auth/react';

const AuthSessionProvider: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthSessionProvider
