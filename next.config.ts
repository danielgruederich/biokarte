import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'linketo.fra1.cdn.digitaloceanspaces.com',
      },
    ],
  },
};

export default nextConfig;
