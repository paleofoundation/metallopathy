import type { NextConfig } from "next";

// Static evidence library: preserve the original trailing-slash URLs
// (e.g. /metals/lead/) and keep internal links consistent.
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
