/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'openlibrary.org'
      }
    ]
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
