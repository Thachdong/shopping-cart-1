import React from "react";
import NextLink from "next/link";
import { TLinkProps } from "@/types/link";

export const Link: React.FC<Readonly<TLinkProps>> = ({
  children,
  type = "internal",
  ...props
}) => {
  if (type === "internal") {
    return <NextLink {...props}>{children}</NextLink>;
  }

  return <a {...props}>{children}</a>;
};
