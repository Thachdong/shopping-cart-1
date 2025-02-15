import { EToastType } from "@/constants";
import { ReactNode } from "react";

type TToastProps = {
  message: string;
  type?: EToastType;
  header?: ReactNode;
  duration?: number;
  onClose?: () => void;
};

type TToast = TToastProps & {
  id: string;
};

type TToastContext = {
  toasts: TToast[];
  addToast: (toast: TToastProps) => void;
  closeToast: (id: id) => void;
};

type TToastProvider = {
  children: React.ReactNode;
};
