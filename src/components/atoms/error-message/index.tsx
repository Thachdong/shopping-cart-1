import { joinClass } from "@/helpers/style";
import React from "react";

const DEFAULT_STYLE = "text-red-900 text-xs italic mb-0";

export const ErrorMessage: React.FC<Readonly<TErrorMessageProps>> = ({
  message,
  className,
}) => {
  return <p className={joinClass(DEFAULT_STYLE, className)}>{message}</p>;
};
