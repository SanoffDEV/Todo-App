import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  experimental: {
    incrementalCacheHandlerPath: "node_modules/@next/cache-handler",
  },
};

export default nextConfig;
