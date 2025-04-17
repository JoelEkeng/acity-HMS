import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
      protocol: 'https',
      hostname: "images.unsplash.com",
      port: '',
      search: '',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
