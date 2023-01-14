import type { NextConfig } from 'next';

import { addSvgrLoader } from './webpack/add-svgr-loader';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: addSvgrLoader,
};

export default nextConfig;
