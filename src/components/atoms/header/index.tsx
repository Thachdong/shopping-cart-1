import { joinClass } from "@/helpers/style";
import React from "react";

const headerLevels: { [key: number]: string } = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

export const Header: React.FC<Readonly<THeader>> = ({
  level,
  children,
  className,
  ...headerProps
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements as React.ElementType;
  const classes = joinClass(
    headerLevels[level] || headerLevels[6],
    "text-primary-100 mb-4",
    className,
  );

  return (
    <Tag className={classes} {...headerProps}>
      {children}
    </Tag>
  );
};
