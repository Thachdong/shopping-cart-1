import { ReactNode } from "react";

type TIconButton = TButtonProps & {
  children?: ReactNode;
  appendIcon?: ReactNode;
  prependIcon?: ReactNode;
};
