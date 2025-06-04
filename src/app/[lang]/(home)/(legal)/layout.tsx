'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header isAuthHeader={true} />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayout
