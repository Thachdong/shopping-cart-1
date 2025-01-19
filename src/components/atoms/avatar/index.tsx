import React from "react";
import Image, { ImageProps } from "next/image";
import { joinClass } from "@/helpers/style";

const DEFAULT_STYLE = "rounded-full align-middle border select-none p-2";

export const Avatar: React.FC<Readonly<ImageProps>> = ({
  className,
  width = 45,
  height = 45,
  alt,
  ...props
}) => {
  return (
    <Image
      className={joinClass(DEFAULT_STYLE, className)}
      width={width}
      height={height}
      alt={alt || "Avatar"}
      {...props}
    />
  );
};
