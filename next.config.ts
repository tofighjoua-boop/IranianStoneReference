import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {},

  images: {
    // Prefer AVIF then WebP — Next.js serves best format per browser automatically
    formats: ["image/avif", "image/webp"],
    // Quality: 90 for sharp stone textures and fine grain detail
    qualities: [90],
    // Full-width breakpoints — includes 2560 for 2K/Retina displays
    deviceSizes: [640, 828, 1080, 1200, 1920, 2560],
    // Fixed-width image breakpoints — covers gallery cards at 25vw/33vw/50vw
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480, 640],
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
