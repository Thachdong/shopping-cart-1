"use client";
import React from "react";
import Image from "next/image";
import { TS3ImageProps } from "@/types/s3-image";
import { useFetchPresignedUrlFromAsset } from "@/libs/hooks/useFetchPresignedUrlFromAsset";

export const S3Image: React.FC<TS3ImageProps> = ({ image, ...props }) => {
  const url = useFetchPresignedUrlFromAsset(image);

  console.log(image);

  if (url) {
    return <Image {...props} src={url} />;
  } else {
    return null;
  }
};
