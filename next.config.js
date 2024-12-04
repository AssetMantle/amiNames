const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

module.exports = withPWA({
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/rpc-proxy", // Proxy route in your app
        destination: "https://rpc.assetmantle.one/", // External RPC URL
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/claim",
        destination: "/",
        permanent: true, // Set to true if this is a permanent redirect
      },
      {
        source: "/profile/:dynamicProfileName",
        destination: "/:dynamicProfileName",
        permanent: true, // Temporary redirect
      },
    ];
  },
});
