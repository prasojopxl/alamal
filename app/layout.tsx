import type { Metadata } from 'next'
import Header from "@/components/Header"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Sidrat Alamal Jaya",
    description: "Nama Sidrat Alamal dari Sidratul Muntaha berasal dari bahasa Arab, dan secara harfiah dapat diterjemahkan sebagai pohon atau pohon terakhir. Beberapa penjelasan dan deskripsi tentang Sidratul Muntaha dapat ditemukan dalam Al-Qur'an, Memang begitu nama Yayasan Sidrat Alamal Jaya",
    keywords: "donasi, amal, alamal, sidrat alamal jaya, sidrat, alamal, alamal jaya, alamal sidrat, alamal alamal, alamal sidrat alamal, alamal sidrat alamal jaya",
    openGraph: {
        images: ["images/logo.jpeg"],
    },
}



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body suppressHydrationWarning={true} className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
