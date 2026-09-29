import type { NextConfig } from 'next';

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The shared workspace package ships TypeScript source.
  transpilePackages: ['@slingshot/shared'],
  async rewrites() {
    // Browser calls to /api/* are proxied to the Express API.
    return [{ source: '/api/:path*', destination: `${API_URL}/api/:path*` }];
  },
  async redirects() {
    return [{ source: '/', destination: '/en-ca/slingshot-sl', permanent: false }];
  },
};

export default nextConfig;
