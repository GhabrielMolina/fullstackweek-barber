import { hostname } from 'os';

// Config para poder usar imagens q estao no banco de dados do prisma 

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io',
            },
        ],
    },
};

export default nextConfig;
