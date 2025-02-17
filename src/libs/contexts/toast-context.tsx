"use client";
import { Toast } from "@/components/molecules/toast";
import { TOAST_TIMEOUT } from "@/constants";
import {
  TToast,
  TToastContext,
  TToastProps,
  TToastProvider,
} from "@/types/toast";
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext<TToastContext | undefined>(undefined);

export const ToastProvider: React.FC<Readonly<TToastProvider>> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<TToast[]>([]);

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: TToastProps) => {
      const id = `Toast_id_${new Date().getTime()}`;

      setToasts((prev) => [
        ...prev,
        {
          ...toast,
          id,
          onClose: () => {
            closeToast(id);
          },
        },
      ]);

      setTimeout(() => {
        closeToast(id);
      }, TOAST_TIMEOUT);
    },
    [closeToast],
  );

  const renderToast = useCallback(
    (toast: TToast) => <Toast key={toast.id} {...toast} />,
    [],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, closeToast }}>
      {children}
      <div
        className="fixed w-full max-w-md sm:w-full grid grid-cols-1 gap-y-2 px-2"
        style={{ bottom: 1 }}
      >
        {toasts.map(renderToast)}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): TToastContext => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
