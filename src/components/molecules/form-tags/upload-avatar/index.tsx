"use client";
import { TUploadAvatar } from "@/types/form";
import React from "react";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";
import { useBgImage } from "@/libs/hooks/useBgImage";

const DEFAULT_CLASSNAME =
  "rounded-full flex items-center justify-center border border-gray-300";

export const UploadAvatar: React.FC<Readonly<TUploadAvatar>> = ({
  width,
  height,
  className,
  value,
  children,
  ...uploadProps
}) => {
  const styles = useBgImage(value as string);

  if (width) {
    styles.width = width + "px";
  }

  if (height) {
    styles.height = height + "px";
  }

  return (
    <div className={joinClass(DEFAULT_CLASSNAME, className)} style={styles}>
      <BaseUpload value={value} {...uploadProps}>
        {children || <Icon name={EIconName["upload-img"]} />}
      </BaseUpload>
    </div>
  );
};
