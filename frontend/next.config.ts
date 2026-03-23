import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity image URLs are served from cdn.sanity.io
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/files/**",
      },
    ],
  },
};

export default nextConfig;
