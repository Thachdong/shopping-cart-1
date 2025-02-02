import { ReactNode } from "react";
import { TButtonProps } from "./button";

type TPosition =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type TTooltip = TButtonProps & {
  content: ReactNode;
  position: TPosition;
  buttonText: ReactNode;
};
