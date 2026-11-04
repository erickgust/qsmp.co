const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7,
    qualities: [60, 75, 85],
  },
}

module.exports = withNextIntl(nextConfig)
