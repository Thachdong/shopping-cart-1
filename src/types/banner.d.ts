import { ReactNode } from "react";

type TBanner = {
  url: string;
  header: ReactNode;
  description?: string;
  buttons?: ReactNode[];
  height?: number;
  width?: number;
};
