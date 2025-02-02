import { joinClass } from "@/helpers/style";
import React from "react";

const DEFAULT_STYLE = "inline-block text-xs border px-1 rounded";

export const Tag: React.FC<Readonly<TTag>> = ({
  content,
  className,
  ...props
}) => {
  return (
    <div className={joinClass(DEFAULT_STYLE, className)} {...props}>
      {content}
    </div>
  );
};
