"use client";
import { joinClass } from "@/helpers/style";
import { TUploadThumbnails } from "@/types/form";
import React, { useMemo } from "react";
import Image from "next/image";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";

const DEFAULT_HEIGHT = 175;
const DEFAULT_WIDTH = 125;
const DEFAULT_CLASSNAME = {
  container: "flex gap-2 flex-wrap",
  thumbnails: "flex gap-2 flex-wrap",
  upload:
    "flex items-center justify-center border border-dashed border-gray-300 align-middle",
  deleteIcon:
    "absolute top-1 right-1 cursor-pointer text-red-500 hover:text-secondary-200",
};

export const UploadThumbnails: React.FC<Readonly<TUploadThumbnails>> = ({
  value = [],
  width,
  height,
  imgClassName,
  thumbnailsClassName,
  children,
  onDelete,
  ...uploadProps
}) => {
  const style = useMemo((): React.CSSProperties => {
    const result: React.CSSProperties = {};

    result.height = (height || DEFAULT_HEIGHT) + "px";

    result.width = (width || DEFAULT_WIDTH) + "px";

    return result;
  }, [width, height]);

  const thumbnails = useMemo(() => {
    return value.map((img) => (
      <div className="relative" key={img}>
        <Image
          src={img}
          alt="Thumbnail"
          width={width || DEFAULT_WIDTH}
          height={height || DEFAULT_HEIGHT}
          className={imgClassName}
        />

        <Icon
          className={DEFAULT_CLASSNAME.deleteIcon}
          name={EIconName["close-circle"]}
          onClick={() => onDelete?.(img)}
        />
      </div>
    ));
  }, [value, width, height, onDelete]);
  return (
    <div
      className={joinClass(DEFAULT_CLASSNAME.container, thumbnailsClassName)}
    >
      {/* uploaded images */}
      <div className={DEFAULT_CLASSNAME.thumbnails}>{thumbnails}</div>

      {/* uploader */}
      <div
        className={joinClass(DEFAULT_CLASSNAME.upload, imgClassName)}
        style={style}
      >
        <BaseUpload {...uploadProps}>
          {children || <Icon name={EIconName["upload-img"]} />}
        </BaseUpload>
      </div>
    </div>
  );
};
