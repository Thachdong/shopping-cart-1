import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      [
        process.env.AWS_S3_BUCKET_NAME,
        "s3",
        process.env.AWS_S3_REGION,
        "amazonaws.com",
      ].join("."),
    ],
  },
};

export default nextConfig;
