import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'development'
    ? {
        experimental: {
          turbo: {
            rules: {
              '*.svg': {
                loaders: ['@svgr/webpack'],
                as: 'react',
              },
            },
          },
        },
      }
    : {
        webpack(config) {
          config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          });

          return config;
        },
      }),
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
