import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "upload.wikimedia.org" },
      { hostname: "sflow.be" },
      { hostname: "github.blog" },
    ],
  },
};

export default nextConfig;
