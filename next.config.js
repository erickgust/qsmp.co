const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7,
    qualities: [60, 75, 85],
    remotePatterns: [
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
      { protocol: 'https', hostname: 'static-cdn.jtvnw.net' },
      { protocol: 'https', hostname: 'nng-phinf.pstatic.net' },
      {
        protocol: 'https',
        hostname: 'profile.img.afreecatv.com',
        pathname: '/LOGO/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
        pathname:
          '/LnjNEVWJTRGBWF_rdcNpsb-tjVs5hOv7_GzXhXtSITr16x-L0BmEGiQYIuajwHNNwwbMpzx4=s900-c-k-c0x00ffffff-no-rj',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
        pathname:
          '/ytc/AIf8zZTY3xqmCDjkv4nqNSlGC-_9wdzoYNfiYjmmVxsoyg=s176-c-k-c0x00ffffff-no-rj',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
