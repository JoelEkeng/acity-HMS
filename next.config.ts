import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
};

export default nextConfig;
