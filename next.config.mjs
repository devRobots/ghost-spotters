/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    headers: () => [
        {
            source: '/api/image',
            headers: [
                { key: 'Cache-Control', value: 'no-store' },
            ]
        }
    ]
};

export default nextConfig;
