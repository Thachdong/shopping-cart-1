"use client";
import { ImageGallery } from "@/components/atoms/image-gallery";
import React from "react";
import { ReactImageGalleryItem } from "react-image-gallery";

export const CardThumbnails: React.FC<Readonly<TCardThumbnails>> = ({
  thumbnails,
  className,
}) => {
  const items: ReactImageGalleryItem[] = thumbnails.map((img) => ({
    original: img,
    thumbnail: img,
    thumbnailClass: "w-8",
  }));
  return <ImageGallery additionalClass={className} items={items} />;
};
