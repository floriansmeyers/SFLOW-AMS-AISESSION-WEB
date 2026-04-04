import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://sflow.be/sessions/ams/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
