'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '../Logo'
import Button from '../Button/Button'

const SignInHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()

    const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open)
    const closeMobileMenu = () => setIsMobileMenuOpen(false)

    return (
        <>
            {/* Mobile Header */}
            <div className="flex items-center justify-between w-full lg:hidden">
                <Logo />
                <button
                    type="button"
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Fullscreen Modal Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-[#ffffff] flex flex-col gap-6 p-6 lg:hidden">
                    <div className="flex justify-between items-center">
                        <Logo />
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4 mt-8">
                        <Link
                            href="/"
                            onClick={closeMobileMenu}
                            className="text-lg text-primary-blue hover:text-black font-semibold"
                        >
                            Home
                        </Link>
                        <Link
                            href="/explore/chalets"
                            onClick={closeMobileMenu}
                            className="text-lg text-primary-blue hover:text-black font-semibold"
                        >
                            Explore
                        </Link>
                    </nav>

                    <div className="mt-auto flex flex-col gap-3">
                        <Button
                            onClick={() => {
                                closeMobileMenu()
                                router.push('/en/login')
                            }}
                            type="button"
                            size="lg"
                            intent="ghost"
                            className="w-full"
                        >
                            Sign In
                        </Button>
                        <Button
                            onClick={() => {
                                closeMobileMenu()
                                router.push('/en/register')
                            }}
                            type="button"
                            size="lg"
                            className="w-full"
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            )}

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between w-full">
                <Logo />
                <nav className="flex items-center space-x-8">
                    <Link href="/" className="text-primary-blue hover:text-black font-medium">
                        Home
                    </Link>
                    <Link href="/explore/chalets" className="text-primary-blue hover:text-black font-medium">
                        Explore
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Button onClick={() => router.push('/en/login')} type="button" size="md" intent="ghost">
                        Sign In
                    </Button>
                    <Button onClick={() => router.push('/en/register')} type="button" size="md" className="text-nowrap">
                        Sign Up
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SignInHeader
