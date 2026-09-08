import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const basePath = ""; // Always empty for demo mode to avoid routing issues

const nextConfig: NextConfig = {
  cacheComponents: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    appNewScrollHandler: true,
    cachedNavigations: true,
    inlineCss: true,
    prefetchInlining: true,
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
      {
        hostname: "*.public.blob.vercel-storage.com",
        protocol: "https",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
    incomingRequests: false,
  },
  poweredByHeader: false,
  reactCompiler: true,
  // Allow localhost origins for development
  ...(process.env.IS_DEMO === "1" ? {
    allowedDevOrigins: ["localhost", "127.0.0.1"],
  } : {}),
};

export default withBotId(nextConfig);
