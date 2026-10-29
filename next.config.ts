import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/resources/about", destination: "/about", permanent: true },
      { source: "/resources/careers", destination: "/career", permanent: true },
      { source: "/resources/events", destination: "/events", permanent: true },
      { source: "/resources/policies", destination: "/legal", permanent: true },
      { source: "/help-centre", destination: "/help-center", permanent: true },
      { source: "/careers", destination: "/career", permanent: true },
      { source: "/features/:slug", destination: "/services/:slug", permanent: true },
      { source: "/policies", destination: "/legal", permanent: true },
    ];
  },
  env: {
    APP_WEBSITE:
      process.env.APP_WEBSITE || "https://development.arineecosystem.com/",
  },
};

export default nextConfig;
