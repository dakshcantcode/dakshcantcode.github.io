import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — no Node server available there.
  output: "export",
  images: {
    // No image-optimization server on GitHub Pages; serve originals as-is.
    unoptimized: true,
    remotePatterns: [
      // Spotify album art CDNs (Now Playing section)
      { protocol: "https", hostname: "**.spotifycdn.com" },
      { protocol: "https", hostname: "i.scdn.co" },
    ],
  },
};

export default nextConfig;
