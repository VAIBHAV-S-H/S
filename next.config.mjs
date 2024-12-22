/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'www.sqs.es', 
            'www.dispatchtrack.com',
            'raw.githubusercontent.com',
            'github.com',
            'tile.openweathermap.org'
        ],
    },
}

export default nextConfig