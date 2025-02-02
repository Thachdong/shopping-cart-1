import { TUploadDisplayImg } from "@/types/form";
import { BaseUpload } from "../base-upload";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { useBgImage } from "@/libs/hooks/useBgImage";
import { joinClass } from "@/helpers/style";
import styles from "./upload-display-image.module.scss";

const DEFAULT_CLASSNAME =
  "flex items-center justify-center border border-dashed border-gray-300 align-middle";

const DEFAULT_WIDTH = 125;
const DEFAULT_HEIGHT = 175;

export const UploadDisplayImage: React.FC<Readonly<TUploadDisplayImg>> = ({
  width,
  height,
  displayClassName,
  className,
  value,
  onDelete,
  ...uploadProps
}) => {
  const style = useBgImage(value as string);

  style.width = (width || DEFAULT_WIDTH) + "px";

  style.height = (height || DEFAULT_HEIGHT) + "px";

  return (
    <div
      className={joinClass(
        DEFAULT_CLASSNAME,
        value ? styles["display-image-uploaded"] : "",
        displayClassName,
      )}
      style={style}
    >
      {/* UPLOADER */}
      <BaseUpload
        className={joinClass(styles["base-upload"], className)}
        value={value}
        {...uploadProps}
      >
        <Icon name={EIconName["upload-img"]} />
      </BaseUpload>

      {/* TRASH ICON */}
      {value && (
        <Icon
          onClick={onDelete}
          className={styles["delete-icon"]}
          name={EIconName.trash}
        />
      )}
    </div>
  );
};
