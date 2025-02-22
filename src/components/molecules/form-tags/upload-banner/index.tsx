"use client";
import { joinClass } from "@/helpers/style";
import { TUploadBanner } from "@/types/form";
import React, { CSSProperties, useMemo } from "react";
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

  const bgImageStyle = useBgImage(url);

  const style: CSSProperties = useMemo(() => {
    const result: CSSProperties = {};

    result.width = width ? width + "px" : "100%";

    result.height = (height || DEFAULT_HEIGHT) + "px";

    return result;
  }, [width, height]);

  return (
    <div
      className={joinClass(
        DEFAULT_CLASSNAME,
        uploadedFile ? styles["banner-uploaded"] : "",
        bannerClassName,
      )}
      style={{ ...bgImageStyle, ...style }}
    >
      <BaseUpload
        className={joinClass(styles["base-upload"], className)}
        disabled={!!url}
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
