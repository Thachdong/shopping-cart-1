import { TSvgIconProps } from "@/types/icon";
import React from "react";
import { ReactSVG } from "react-svg";

export const Icon: React.FC<Readonly<TSvgIconProps>> = ({
  name,
  className,
  width = 24,
  height = 24,
  fill,
}) => {
  return (
    <ReactSVG
      fill={fill}
      src={`/icons/${name}.svg`}
      wrapper="span"
      beforeInjection={(svg) => {
        const svgWidth = width ? `${width}px` : "auto";

        const svgHeight = height ? `${height}px` : "auto";

        svg.setAttribute(
          "style",
          `width: ${svgWidth}; height: ${svgHeight}; cursor: pointer; user-select: none`,
        );

        svg.setAttribute("class", className || "");

        if (fill) {
          svg.setAttribute("fill", fill);
        }
      }}
    />
  );
};
