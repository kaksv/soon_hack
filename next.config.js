/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_ONERAMP_CLIENT: process.env.NEXT_ONERAMP_CLIENT,
    NEXT_ONERAMP_SECRET: process.env.NEXT_ONERAMP_SECRET,
  },
};

module.exports = nextConfig;
