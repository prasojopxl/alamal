/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_BASE: process.env.URL_BASE,
        URL_API: process.env.URL_API,
        URL_MEDIA: process.env.URL_MEDIA,
        KEY_API: process.env.KEY_API,
        KEY_API2: process.env.KEY_API2,
        NEXT_PUBLIC_CLIENT:process.env.NEXT_PUBLIC_CLIENT,
        NEXT_PUBLIC_SECRET:process.env.NEXT_PUBLIC_SECRET,
        NEXT_PUBLIC_API:process.env.NEXT_PUBLIC_API     
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "adm.stagingaja.com",
                pathname: "**",
            },
        ],
    },        
}

module.exports = nextConfig
