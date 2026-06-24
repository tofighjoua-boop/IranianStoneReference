import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {},

  images: {
    // Prefer AVIF then WebP — Next.js serves best format per browser automatically
    formats: ["image/avif", "image/webp"],
    // Quality: 80 is visually identical to 100 but ~40% smaller
    qualities: [80],
    // Responsive breakpoints matching our grid (25vw / 50vw / 100vw)
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Serve optimized images for 1 year (Vercel CDN)
    minimumCacheTTL: 31536000,
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
