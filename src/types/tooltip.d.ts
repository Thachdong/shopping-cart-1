import { ReactNode } from "react";

type TPosition = "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

type TTooltip = TButtonProps & {
  content: ReactNode;
  position: TPosition;
  buttonText: ReactNode;
};
