"use client";
import { ImageGallery } from "@/components/atoms/image-gallery";
import { useFetchPresignedUrlFromAsset } from "@/libs/hooks/useFetchPresignedUrlFromAsset";
import { TCardThumbnails } from "@/types/product";
import React from "react";
import { ReactImageGalleryItem } from "react-image-gallery";

export const CardThumbnails: React.FC<Readonly<TCardThumbnails>> = ({
  thumbnails,
  className,
}) => {
  const urls = useFetchPresignedUrlFromAsset(thumbnails);

  const items: ReactImageGalleryItem[] = urls.map((img) => ({
    original: img,
    thumbnail: img,
    thumbnailClass: "w-8",
  }));
  return <ImageGallery additionalClass={className} items={items} />;
};
