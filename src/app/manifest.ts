import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AMI Names",
    short_name: "AMI",
    description: "Claim your AMI Names",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "512x512 192x192 1144x144 128x128 64x64 48x48 32x32 16x16",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon512x512.svg",
        sizes: "512x512",
        type: "image/svg",
        purpose: "any",
      },
    ],
  };
}
