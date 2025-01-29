import { joinClass } from "@/helpers/style";
import { TUploadBanner } from "@/types/form";
import React from "react";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { useBgImage } from "@/libs/hooks/useBgImage";
import styles from "./upload-banner.module.scss";

const DEFAULT_HEIGHT = 275;
const DEFAULT_CLASSNAME =
  "flex items-center justify-center border border-dashed border-gray-300";

export const UploadBanner: React.FC<Readonly<TUploadBanner>> = ({
  width,
  height,
  bannerClassName,
  children,
  value,
  className,
  ...uploadProps
}) => {
  const style = useBgImage(value as string);

  style.height = (height || DEFAULT_HEIGHT) + "px";

  style.width = width ? width + "px" : "100%";

  return (
    <div
      className={joinClass(
        DEFAULT_CLASSNAME,
        value ? styles["banner-uploaded"] : "",
        bannerClassName,
      )}
      style={style}
    >
      <BaseUpload
        className={joinClass(styles["base-upload"], className)}
        value={value}
        {...uploadProps}
      >
        {children || <Icon name={EIconName["upload-img"]} />}
      </BaseUpload>
    </div>
  );
};
