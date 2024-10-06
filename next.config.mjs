/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pixabay.com',
                pathname: '/get/**',
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
