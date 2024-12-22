/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['www.sqs.es', 'www.dispatchtrack.com'],
    },
}

export default nextConfig