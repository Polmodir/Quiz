/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACK_END_URL: process.env.BACK_END,
  },
};

module.exports = nextConfig;
