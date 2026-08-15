import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This allows you to test the app on your local network (like your phone)
  allowedDevOrigins: ['192.168.116.1', 'localhost'],
};

export default nextConfig;