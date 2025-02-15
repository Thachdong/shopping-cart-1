"use client";
import React from "react";
import RcUpload from "rc-upload";
import { TBaseUpload } from "@/types/form";
import { joinClass } from "@/helpers/style";

export const BaseUpload: React.FC<Readonly<TBaseUpload>> = ({
  children,
  className,
  ...uploadProps
}) => {
  return (
    <RcUpload
      className={joinClass(
        uploadProps.disabled ? "!cursor-not-allowed" : "",
        className,
      )}
      {...uploadProps}
    >
      {children}
    </RcUpload>
  );
};
