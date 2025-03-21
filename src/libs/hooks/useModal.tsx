"use client";
import { useCallback, useState } from "react";

export const useModal = (): TModalHook => {
  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    onOpen,
    onClose,
  };
};
