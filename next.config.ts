import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vibralatambucket01.s3.amazonaws.com',
        pathname: '/properties-photos-prod/**',
      },
      {
        protocol: 'https',
        hostname: 'vibralatambucket01.s3.us-east-1.amazonaws.com',
        pathname: '/properties-photos-prod/**',
      },
    ],
  },
};

export default nextConfig;
