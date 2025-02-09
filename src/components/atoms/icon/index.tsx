"use client";
import { TSvgIconProps } from "@/types/icon";
import React from "react";
import { ReactSVG } from "react-svg";

export const Icon: React.FC<Readonly<TSvgIconProps>> = ({
  name,
  className,
  iconClassName,
  width = 24,
  height = 24,
  fill,
  onClick,
}) => {
  return (
    <ReactSVG
      fill={fill}
      src={`/icons/${name}.svg`}
      wrapper="span"
      className={iconClassName}
      beforeInjection={(svg) => {
        const svgWidth = width ? `${width}px` : "auto";

        const svgHeight = height ? `${height}px` : "auto";

        svg.setAttribute(
          "style",
          `width: ${svgWidth}; height: ${svgHeight}; user-select: none`,
        );

        svg.setAttribute("class", className ?? "");

        if (fill) {
          svg.setAttribute("fill", fill);
        }
      }}
      onClick={onClick}
    />
  );
};
