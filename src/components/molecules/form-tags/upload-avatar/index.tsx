"use client";
import { TUploadAvatar } from "@/types/form";
import React from "react";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";
import { useBgImage } from "@/libs/hooks/useBgImage";
import styles from "./upload-avatar.module.scss";

const DEFAULT_CLASSNAME =
  "rounded-full flex items-center justify-center border border-gray-300 align-middle";

export const UploadAvatar: React.FC<Readonly<TUploadAvatar>> = ({
  width,
  height,
  className,
  avatarClassName,
  value,
  children,
  onDelete,
  ...uploadProps
}) => {
  const bgStyles = useBgImage(value as string);

  if (width) {
    bgStyles.width = width + "px";
  }

  if (height) {
    bgStyles.height = height + "px";
  }

  return (
    <div
      className={joinClass(
        DEFAULT_CLASSNAME,
        value ? styles["avatar-uploaded"] : "",
        avatarClassName,
      )}
      style={bgStyles}
    >
      {/* UPLOADER */}
      {!value && (
        <BaseUpload
          className={joinClass(styles["base-upload"], className)}
          value={value}
          {...uploadProps}
        >
          {children || <Icon name={EIconName["upload-img"]} />}
        </BaseUpload>
      )}

      {/* TRASH ICON */}
      {value && (
        <Icon
          className={joinClass(styles["delete-icon"], styles["base-upload"])}
          name={EIconName.trash}
          onClick={onDelete}
        />
      )}
    </div>
  );
};
