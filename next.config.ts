import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["picsum.photos", "another-domain.com", "cdn.pixabay.com"], // Thêm các tên miền khác nếu cần
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

export default nextConfig;
