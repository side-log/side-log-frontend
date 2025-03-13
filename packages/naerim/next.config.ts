import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'www.notion.so',
        protocol: 'https',
      },
      {
        hostname: 'file.notion.so',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
