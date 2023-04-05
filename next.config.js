/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      // ... (add any other external image domains you want to allow)
    ],
  },
}

module.exports = nextConfig
