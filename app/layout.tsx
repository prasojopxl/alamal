import type { Metadata } from 'next'
import Header from "@/components/Header"
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from "@/components/Footer"
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s | Sidrat Alamal Jaya',
        default: 'Sidrat Alamal Jaya ',
    },
    description: "Nama Sidrat Alamal dari Sidratul Muntaha berasal dari bahasa Arab, dan secara harfiah dapat diterjemahkan sebagai pohon atau pohon terakhir. Beberapa penjelasan dan deskripsi tentang Sidratul Muntaha dapat ditemukan dalam Al-Qur'an, Memang begitu nama Yayasan Sidrat Alamal Jaya",
    keywords: "donasi, amal, alamal, sidrat alamal jaya, sidrat, alamal, alamal jaya, alamal sidrat, alamal alamal, alamal sidrat alamal, alamal sidrat alamal jaya",
    icons: "/images/logo.png",
    openGraph: {
        images: "images/logo.jpeg",
    },
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <Script strategy="lazyOnload">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '2072979186392651');
                        fbq('track', 'PageView');
                  `}
                </Script>
                <noscript>
                    <img height="1" width="1" style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=2072979186392651&ev=PageView&noscript=1"
                    />
                </noscript>
            </head>
            <body suppressHydrationWarning={true} className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
