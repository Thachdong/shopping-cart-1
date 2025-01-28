import React from "react";
import RcUpload from "rc-upload";
import { TBaseUpload } from "@/types/form";

export const BaseUpload: React.FC<Readonly<TBaseUpload>> = ({
  children,
  ...uploadProps
}) => {
  return <RcUpload {...uploadProps}>{children}</RcUpload>;
};
