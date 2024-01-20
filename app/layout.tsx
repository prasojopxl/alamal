import type { Metadata } from 'next'
import Header from "@/components/Header"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Al Amal",
    description: "Charity amal",
    keywords: "donasi, amal, alamal",
}



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true} className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
