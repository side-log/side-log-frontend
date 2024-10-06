import withTmInitializer from 'next-transpile-modules'

const withTM = withTmInitializer(['@yeaaaah/shared'], { unstable_webpack5: true });

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
});

export default nextConfig;
