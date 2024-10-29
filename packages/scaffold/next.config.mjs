import withTmInitializer from 'next-transpile-modules';

const withTM = withTmInitializer(['@yeaaaah/shared'], {
  unstable_webpack5: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

export default nextConfig;
