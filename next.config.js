/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // output: "export",
  // distDir: "_static",
  experimental: {
    serverActions: true,
  },
  images: {
    // unoptimized: true,
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
      { protocol: 'https', hostname: 'static-cdn.jtvnw.net' },
      { protocol: 'https', hostname: 'nng-phinf.pstatic.net' },
      { protocol: 'https', hostname: 'profile.img.afreecatv.com', pathname: '/LOGO/**' },
      { protocol: 'https', hostname: 'yt3.googleusercontent.com', pathname: '/LnjNEVWJTRGBWF_rdcNpsb-tjVs5hOv7_GzXhXtSITr16x-L0BmEGiQYIuajwHNNwwbMpzx4=s900-c-k-c0x00ffffff-no-rj' },
      { protocol: 'https', hostname: 'yt3.googleusercontent.com', pathname: '/ytc/AIf8zZTY3xqmCDjkv4nqNSlGC-_9wdzoYNfiYjmmVxsoyg=s176-c-k-c0x00ffffff-no-rj' },
      { protocol: 'https', hostname: 'yt3.googleusercontent.com', pathname: '/cjEUgCIFFMgoIZFMAH5smTLcfPle0p1bbxGgyEiOat9ZZJZmHh53JH4dmtqdnvq3NZVoxWG2QQ=s176-c-k-c0x00ffffff-no-rj' },
    ]
  },
  // webpack: (config) => {
  //   config.externals.push({
  //     'utf-8-validate': 'commonjs utf-8-validate',
  //     'bufferutil': 'commonjs bufferutil',
  //   })
  //   return config
  // }
};

module.exports = nextConfig;
