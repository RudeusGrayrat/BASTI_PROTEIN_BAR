import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/cuenta/puntos", destination: "/puntos", permanent: true },
    ];
  },
};

export default nextConfig;
