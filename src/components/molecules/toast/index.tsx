import { Header } from "@/components/atoms/header";
import { Icon } from "@/components/atoms/icon";
import { DEFAULT_TOAST_DURATION, EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";
import { TToast } from "@/types/toast";
import React, { useCallback } from "react";

const DEFAULT_TOAST_CLASSNAME = "relative py-2 border rounded-lg text-sm ease-in-out";
const TOAST_HEADER_CLASSNAME = "px-4 border-b capitalize mb-2 pb-2 border-white";
const TOAST_ICON_CLASSNAME = "absolute right-2 top-2";
const TOAST_CONTENT_CLASSNAME = "px-4";

const TOAST_TYPE_CLASSES = {
  info: "bg-blue-100 border-blue-500 text-blue-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  error: "bg-red-100 border-red-500 text-red-700",
  success: "bg-green-100 border-green-500 text-green-700",
};

export const Toast: React.FC<Readonly<TToast>> = ({
  message,
  type,
  header,
  duration,
}) => {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration || DEFAULT_TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [duration]);

  const closeToast = useCallback(() => {
    setShow(false);
  }, []);

  if (!show) return <></>;

  return (
    <div
      className={joinClass(
        DEFAULT_TOAST_CLASSNAME,
        TOAST_TYPE_CLASSES[type || "success"]
      )}
    >
      <Header level={6} className={joinClass(TOAST_HEADER_CLASSNAME)}>
        {header ?? type}
      </Header>

      <p className={joinClass(TOAST_CONTENT_CLASSNAME)}>{message}</p>

      <Icon
        onClick={closeToast}
        className={joinClass(TOAST_ICON_CLASSNAME)}
        name={EIconName.close}
      />
    </div>
  );
};
