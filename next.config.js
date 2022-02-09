/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.example.com', 'interactive-examples.mdn.mozilla.net']
  }
}

module.exports = nextConfig
