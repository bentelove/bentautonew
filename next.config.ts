import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'taskkill228.github.io',
        port: '',
        pathname: '/photo_cars/**',
        search: '',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/node_modules/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ];
  }
};

export default nextConfig;