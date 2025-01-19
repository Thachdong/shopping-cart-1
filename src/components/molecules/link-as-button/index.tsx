import { Button } from "@/components/atoms/button";
import { Link } from "@/components/atoms/link";
import { TLinkAsButtonProps } from "@/types/link-as-button";
import React from "react";

export const LinkAsButton: React.FC<Readonly<TLinkAsButtonProps>> = ({
  children,
  buttonProps,
  ...linkProps
}) => {
  return (
    <Link {...linkProps}>
      <Button {...buttonProps}>{children}</Button>
    </Link>
  );
};
