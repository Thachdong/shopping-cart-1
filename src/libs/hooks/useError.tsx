import { TError, TUseErrorResponse } from "@/types/form";
import { useCallback, useState } from "react";

export const useError = (): TUseErrorResponse => {
  const [errors, setErrors] = useState<TError[]>([]);

  const addError = useCallback((err: TError) => {
    setErrors((prev) => {
      const errIndex = prev.findIndex((e) => e.key === err.key);

      const isErrExisted = errIndex !== -1;

      if (isErrExisted) {
        const nextError = [...prev];
        nextError[errIndex] = { ...err };
        return nextError;
      }

      return [...prev, { ...err }];
    });
  }, []);

  const removeError = useCallback((errKey: string) => {
    setErrors((prev) => prev.filter((e) => e.key !== errKey));
  }, []);

  const clearError = useCallback(() => {
    setErrors([]);
  }, []);

  const getError = useCallback(
    (key: string) => {
      return errors.find((e) => e.key === key)?.message || "";
    },
    [errors],
  );

  return {
    errors,
    addError,
    removeError,
    clearError,
    getError,
  };
};
