import type { NextConfig } from "next";
import legacyUrls from "./src/lib/seo/legacy-urls.json";

const nextConfig: NextConfig = {
  // Resolve old WordPress URLs, including their slash versions, in one 301.
  // The final rule preserves the existing slash canonicalization elsewhere.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...legacyUrls.redirects.flatMap(({ source, destination }) => [
        { source, destination, statusCode: 301 as const },
        { source: `${source}/`, destination, statusCode: 301 as const },
      ]),
      { source: '/:path+/', destination: '/:path+', statusCode: 308 as const },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: legacyUrls.gone.map(source => ({ source, destination: '/contenu-retire' })),
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return legacyUrls.noindex.flatMap(source => [source, `${source}/`]).map(source => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
    }));
  },
};

export default nextConfig;
