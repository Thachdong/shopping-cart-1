"use client";
import React from "react";
import Image from "next/image";
import { TS3ImageProps } from "@/types/s3-image";
import { useFetchPresignedUrlFromAsset } from "@/libs/hooks/useFetchPresignedUrlFromAsset";

export const S3Image: React.FC<TS3ImageProps> = ({ image, alt, ...props }) => {
  const [url] = useFetchPresignedUrlFromAsset([image]);

  if (url) {
    return <Image {...props} src={url} alt={alt || "s3 image"} />;
  } else {
    return null;
  }
};
