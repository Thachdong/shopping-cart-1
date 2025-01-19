import { ReactNode } from "react";

type TPosition = "top" | "bottom" | "left" | "right";

type TTooltip = TButtonProps & {
  content: ReactNode;
  position: TPosition;
  buttonText: ReactNode;
};
