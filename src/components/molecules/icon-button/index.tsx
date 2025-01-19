import { Button } from "@/components/atoms/button";
import { joinClass } from "@/helpers/style";
import { TIconButton } from "@/types/icon-button";
import React from "react";

const DEFAULT_STYLE = "flex items-center gap-2";

export const IconButton: React.FC<Readonly<TIconButton>> = ({
  appendIcon = <></>,
  prependIcon = <></>,
  children,
  className,
  ...buttonProps
}) => {
  return (
    <Button className={joinClass(DEFAULT_STYLE, className)} {...buttonProps}>
      {appendIcon}
      {children}
      {prependIcon}
    </Button>
  );
};
