'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default DefaultLayout
