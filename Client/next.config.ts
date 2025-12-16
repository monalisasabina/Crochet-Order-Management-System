import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "daisycottagedesigns.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.allfreecrochet.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;