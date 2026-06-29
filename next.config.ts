import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {},

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [100],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480, 640],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      // Vercel Blob storage URLs (for runtime-uploaded images)
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },

  webpack: (config) => {
    // Fix for non-ASCII characters in parent directory path breaking module resolution
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      "node_modules",
    ];
    return config;
  },
};

export default nextConfig;
