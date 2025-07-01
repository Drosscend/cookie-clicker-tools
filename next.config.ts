import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
};

export default nextConfig;
