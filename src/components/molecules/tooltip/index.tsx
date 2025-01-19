"use client";
import { Button } from "@/components/atoms/button";
import { joinClass } from "@/helpers/style";
import { TTooltip } from "@/types/tooltip";
import React, { useCallback, useMemo, useState } from "react";

export const Tooltip: React.FC<Readonly<TTooltip>> = ({
  content,
  position,
  buttonText,
  ...buttonProps
}) => {
  const [visible, setVisible] = useState(true);

  const showTooltip = useCallback(() => setVisible(true), []);

  const hideTooltip = useCallback(() => setVisible(false), []);

  const tooltipContent = useMemo(() => {
    if (visible) return content;

    return <></>;
  }, [visible, content]);

  const contentClass = useMemo(() => {
    const baseClassName = "absolute max-w-max";

    let positionClassName = "";

    switch (position) {
      case "top":
        positionClassName =
          "bottom-full left-1/2 transform -translate-x-1/2 mb-1";
        break;
      case "bottom":
        positionClassName = "top-full left-1/2 transform -translate-x-1/2 mt-1";
        break;
      case "left":
        positionClassName =
          "right-full top-1/2 transform -translate-y-1/2 mr-1";
        break;
      case "right":
        positionClassName = "left-full top-1/2 transform -translate-y-1/2 ml-1";
        break;
      default:
        positionClassName = "";
    }

    return joinClass(baseClassName, positionClassName);
  }, [position]);

  return (
    <div className="relative inline-block">
      <Button
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        {...buttonProps}
      >
        {buttonText}
      </Button>

      <div className={contentClass}>{tooltipContent}</div>
    </div>
  );
};
