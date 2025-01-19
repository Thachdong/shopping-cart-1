import { joinClass } from "@/helpers/style";
import React from "react";

type TDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const DEFAULT_STYLE = "inline-block text-xs border px-1 rounded";

export const Tag: React.FC<Readonly<TDivProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={joinClass(DEFAULT_STYLE, className)} {...props}>
      {children}
    </div>
  );
};
