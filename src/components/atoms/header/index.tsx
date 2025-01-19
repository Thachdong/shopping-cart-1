import { joinClass } from "@/helpers/style";
import React, { useMemo } from "react";

export const Header: React.FC<Readonly<THeader>> = ({
  level,
  children,
  className,
  ...headerProps
}) => {
  const content = useMemo(() => {
    switch (level) {
      case 1:
        return (
          <h1 className={joinClass("text-4xl", className)} {...headerProps}>
            {children}
          </h1>
        );
      case 2:
        return (
          <h2 className={joinClass("text-3xl", className)} {...headerProps}>
            {children}
          </h2>
        );
      case 3:
        return (
          <h3 className={joinClass("text-2xl", className)} {...headerProps}>
            {children}
          </h3>
        );
      case 4:
        return (
          <h4 className={joinClass("text-xl", className)} {...headerProps}>
            {children}
          </h4>
        );
      case 5:
        return (
          <h5 className={joinClass("text-lg", className)} {...headerProps}>
            {children}
          </h5>
        );
      default:
        return (
          <h6 className={joinClass("text-base", className)} {...headerProps}>
            {children}
          </h6>
        );
    }
  }, [level, children, className, headerProps]);

  return content;
};
