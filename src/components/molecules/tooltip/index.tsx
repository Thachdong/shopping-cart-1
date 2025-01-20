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
  const [visible, setVisible] = useState(false);

  const showTooltip = useCallback(() => setVisible(true), []);

  const hideTooltip = useCallback(() => setVisible(false), []);

  const tooltipContent = useMemo(() => {
    if (!visible) return <></>;

    const baseClassName = "absolute w-max border rounded py-1 px-2";

    const classNameBaseOnPosition = {
      top: "bottom-full left-1/2 transform -translate-x-1/2 mb-1",
      bottom: "top-full left-1/2 transform -translate-x-1/2 mt-1",
      left: "right-full top-1/2 transform -translate-y-1/2 mr-1",
      right: "left-full top-1/2 transform -translate-y-1/2 ml-1",
      "top-left": "bottom-full left-0 mb-1",
      "top-right": "bottom-full right-0 mb-1",
      "bottom-left": "top-full left-0 mt-1",
      "bottom-right": "top-full right-0 mt-1",
    };

    const contentClass = joinClass(
      baseClassName,
      classNameBaseOnPosition[position]
    );

    return <div className={contentClass}>
      <div className="max-w-xs">
      {content}
      </div>
    </div>;
  }, [visible, content, position]);

  return (
    <div className="relative inline-block">
      <Button
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        {...buttonProps}
      >
        {buttonText}
      </Button>

      {tooltipContent}
    </div>
  );
};
