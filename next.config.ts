import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'files.edgestore.dev' }], // Add your image host here
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '73pnkdc0-3000.asse.devtunnels.ms'], // Add the required origins
    },
  },
};

export default nextConfig;
