import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7,
    qualities: [60, 75, 85],
  },
}

export default withNextIntl(nextConfig)
