"use client";
import { joinClass } from "@/helpers/style";
import { TUploadBanner } from "@/types/form";
import React from "react";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { useBgImage } from "@/libs/hooks/useBgImage";
import styles from "./upload-banner.module.scss";
import { useFetchPresignedUrlFromAsset } from "@/libs/hooks/useFetchPresignedUrlFromAsset";

const DEFAULT_HEIGHT = 275;
const DEFAULT_CLASSNAME =
  "flex items-center justify-center border border-dashed border-gray-300";

export const UploadBanner: React.FC<Readonly<TUploadBanner>> = ({
  width,
  height,
  bannerClassName,
  children,
  className,
  onDelete,
  uploadedFile,
  ...uploadProps
}) => {
  const url = useFetchPresignedUrlFromAsset(uploadedFile);

  const style = useBgImage(url);

  return (
    <div
      className={joinClass(
        DEFAULT_CLASSNAME,
        uploadedFile ? styles["banner-uploaded"] : "",
        bannerClassName,
      )}
      style={{
        ...style,
        height: (height || DEFAULT_HEIGHT) + "px",
        width: width ? width + "px" : "100%",
      }}
    >
      <BaseUpload
        className={joinClass(styles["base-upload"], className)}
        {...uploadProps}
      >
        {children || <Icon name={EIconName["upload-img"]} />}
      </BaseUpload>

      {/* TRASH ICON */}
      {uploadedFile && (
        <Icon
          className={styles["delete-icon"]}
          name={EIconName.trash}
          onClick={onDelete}
        />
      )}
    </div>
  );
};
