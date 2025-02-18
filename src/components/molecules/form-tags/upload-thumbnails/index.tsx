"use client";
import { joinClass } from "@/helpers/style";
import { TUploadThumbnails } from "@/types/form";
import React, { useMemo } from "react";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { S3Image } from "@/components/atoms/s3-image";

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
  width,
  height,
  imgClassName,
  thumbnailsClassName,
  children,
  onDelete,
  uploadedFile,
  ...uploadProps
}) => {
  const style = useMemo((): React.CSSProperties => {
    const result: React.CSSProperties = {};

    result.height = (height || DEFAULT_HEIGHT) + "px";

    result.width = (width || DEFAULT_WIDTH) + "px";

    return result;
  }, [width, height]);

  console.log(uploadedFile);

  const thumbnails = useMemo(() => {
    return uploadedFile?.map?.((img) => (
      <div className="relative" key={img.id}>
        <S3Image
          image={img}
          alt="Thumbnail"
          width={width || DEFAULT_WIDTH}
          height={height || DEFAULT_HEIGHT}
          className={imgClassName}
        />

        <Icon
          className={DEFAULT_CLASSNAME.deleteIcon}
          name={EIconName.trash}
          onClick={() => onDelete?.(img.id)}
        />
      </div>
    ));
  }, [uploadedFile, width, height, onDelete, imgClassName]);
  return (
    <div
      className={joinClass(DEFAULT_CLASSNAME.container, thumbnailsClassName)}
    >
      {/* uploaded images */}
      {thumbnails?.length > 0 && (
        <div className={DEFAULT_CLASSNAME.thumbnails}>{thumbnails}</div>
      )}

      {/* uploader */}
      <div
        className={joinClass(DEFAULT_CLASSNAME.upload, imgClassName)}
        style={style}
      >
        <BaseUpload {...uploadProps} multiple>
          {children || (
            <div className="flex flex-col justify-center items-center">
              <Icon name={EIconName["upload-img"]} />
              <span className="text-center">Upload Thumbnails</span>
            </div>
          )}
        </BaseUpload>
      </div>
    </div>
  );
};
