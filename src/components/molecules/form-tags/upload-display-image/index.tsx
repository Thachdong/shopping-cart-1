"use client";
import { TUploadDisplayImg } from "@/types/form";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { useBgImage } from "@/libs/hooks/useBgImage";
import { joinClass } from "@/helpers/style";
import styles from "./upload-display-image.module.scss";
import { useFetchPresignedUrlFromAsset } from "@/libs/hooks/useFetchPresignedUrlFromAsset";
import { CSSProperties, useMemo } from "react";

const DEFAULT_CLASSNAME =
  "flex items-center justify-center border border-dashed border-gray-300 align-middle";

const DEFAULT_WIDTH = 125;
const DEFAULT_HEIGHT = 175;

export const UploadDisplayImage: React.FC<Readonly<TUploadDisplayImg>> = ({
  width,
  height,
  displayClassName,
  className,
  onDelete,
  uploadedFile,
  ...uploadProps
}) => {
  const [url] = useFetchPresignedUrlFromAsset(
    uploadedFile ? [uploadedFile] : [],
  );

  const bgImageStyle = useBgImage(url);

  const style: CSSProperties = useMemo(() => {
    const result: CSSProperties = {};

    result.width = (width || DEFAULT_WIDTH) + "px";

    result.height = (height || DEFAULT_HEIGHT) + "px";

    return result;
  }, [width, height]);

  return (
    <div
      className={joinClass(
        DEFAULT_CLASSNAME,
        uploadedFile ? styles["display-image-uploaded"] : "",
        displayClassName,
      )}
      style={{ ...bgImageStyle, ...style }}
    >
      {/* UPLOADER */}
      <BaseUpload
        className={joinClass(
          styles["base-upload"],
          "flex flex-col justify-center items-center text-center",
          className,
        )}
        {...uploadProps}
      >
        <Icon name={EIconName["upload-img"]} />
        Upload Display Image
      </BaseUpload>

      {/* TRASH ICON */}
      {uploadedFile && (
        <Icon
          onClick={onDelete}
          className={styles["delete-icon"]}
          name={EIconName.trash}
        />
      )}
    </div>
  );
};
