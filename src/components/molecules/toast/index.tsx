import { Header } from "@/components/atoms/header";
import { Icon } from "@/components/atoms/icon";
import { EIconName, EToastType, TOAST_TIMEOUT } from "@/constants";
import { joinClass } from "@/helpers/style";
import { TToastProps } from "@/types/toast";
import React from "react";
import "./toast.scss";

const DEFAULT_TOAST_CLASSNAME =
  "relative py-2 border rounded-lg text-sm ease-in-out max-w-md";
const TOAST_HEADER_CLASSNAME =
  "px-4 border-b capitalize mb-2 pb-2 border-white text-sm font-bold";
const TOAST_ICON_CLASSNAME = "absolute right-2 top-2 cursor-pointer";
const TOAST_CONTENT_CLASSNAME = "px-4";

const TOAST_TYPE_CLASSES = {
  info: "bg-blue-100 border-blue-500 text-blue-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  error: "bg-red-100 border-red-500 text-red-700",
  success: "bg-green-100 border-green-500 text-green-700",
};

const TOAST_PROGRESS_COLOR = {
  info: "bg-blue-500",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  success: "bg-green-500",
};

export const Toast: React.FC<Readonly<TToastProps>> = ({
  message,
  type,
  header,
  duration,
  onClose,
}) => {
  return (
    <div
      className={joinClass(
        DEFAULT_TOAST_CLASSNAME,
        TOAST_TYPE_CLASSES[type || EToastType.success],
      )}
    >
      <Header level={6} className={joinClass(TOAST_HEADER_CLASSNAME)}>
        {header ?? type}
      </Header>

      <p className={joinClass(TOAST_CONTENT_CLASSNAME)}>{message}</p>

      <Icon
        onClick={onClose}
        className={joinClass(TOAST_ICON_CLASSNAME)}
        name={EIconName.close}
      />

      <div
        className={joinClass(
          TOAST_PROGRESS_COLOR[type || EToastType.success],
          "progress-bar",
        )}
        style={
          {
            "--duration": `${(duration || TOAST_TIMEOUT) / 1000}s`,
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
};
