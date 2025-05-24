import { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  images: {
    domains: ["picsum.photos", "another-domain.com", "cdn.pixabay.com", "encrypted-tbn0.gstatic.com"], // Thêm các tên miền khác nếu cần
  },
  experimental: {
    turbo: {
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
      rules: {
        "*.mdx": ["mdx-loader"],
        "*.jsx": ["babel-loader"],
      },
    },
  },
};

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzerConfig(nextConfig);
