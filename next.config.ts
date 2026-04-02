import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "upload.wikimedia.org" },
      { hostname: "sflow.be" },
      { hostname: "github.blog" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/register",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSf84vHbsi705vgu06A7oj-hG0t671kMyCrkQZdOYf9UGLGS9Q/viewform?usp=header",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
