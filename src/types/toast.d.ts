import { EToastType } from "@/constants";
import { ReactNode } from "react";

type TToast = {
  message: string;
  type?: EToastType;
  header?: ReactNode;
  duration?: number;
};
