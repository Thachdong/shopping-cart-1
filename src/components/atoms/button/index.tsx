import { joinClass } from "@/helpers/style";
import React from "react";

const DEFAULT_STYLE =
  "h-9 px-4 border border-white rounded-lg font-semibold transition duration-200 ease-in-out";

const VARIANT_STYLE = {
  normal: "",
  primary:
    "bg-primary-100 text-white hover:border-primary-100 hover:bg-white hover:text-primary-100",
  secondary:
    "bg-secondary-100 text-white hover:border-secondary-100 hover:bg-white hover:text-secondary-100",
  tertiary:
    "bg-yellow-200 text-white hover:border-yellow-200 hover:bg-white hover:text-yellow-200",
};

export const Button: React.FC<TButtonProps> = ({
  children,
  className,
  type = "normal",
  ...buttonProps
}) => {
  return (
    <button
      className={joinClass(
        DEFAULT_STYLE,
        className,
        VARIANT_STYLE[type as keyof typeof VARIANT_STYLE],
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
