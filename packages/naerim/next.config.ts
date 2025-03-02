import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
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
