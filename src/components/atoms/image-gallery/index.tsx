"use client";
import { TImageGallery } from "@/types/image-gallery";
import React from "react";
import Gallery from "react-image-gallery";
import "./image-gallery.scss";
import { joinClass } from "@/helpers/style";

export const ImageGallery: React.FC<Readonly<TImageGallery>> = ({
  additionalClass,
  ...props
}) => {
  return (
    <Gallery
      additionalClass={joinClass("my-image-gallery", additionalClass)}
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...props}
    />
  );
};
