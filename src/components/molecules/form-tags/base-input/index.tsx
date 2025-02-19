"use client";
import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";
import { TBaseInput } from "@/types/form";
import React, { useCallback } from "react";

const DEFAULT_CLASSNAME = "flex flex-col gap-2";
const DEFAULT_INPUT_CLASSNAME = "border border-gray-300 rounded h-9 px-2";

export const BaseInput: React.FC<Readonly<TBaseInput>> = ({
  label,
  id,
  className,
  inputClassName,
  error,
  type,
  value,
  onChange,
  ...inputProps
}) => {
  const customOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;

      if (type === "number") {
        const newValue = Number.isNaN(Number(val)) ? value : Number(val);

        // @ts-expect-error: Type 'number' is not assignable to type 'string'
        onChange?.(newValue);
      } else {
        // @ts-expect-error: Type 'string' is not assignable to type 'number'
        onChange?.(val);
      }
    },
    [onChange, type, value],
  );
  return (
    <label className={joinClass(DEFAULT_CLASSNAME, className)} htmlFor={id}>
      {label}
      <input
        className={joinClass(DEFAULT_INPUT_CLASSNAME, inputClassName)}
        id={id}
        value={value}
        onChange={customOnChange}
        {...inputProps}
      />
      {error && <ErrorMessage className="-mt-1" message={error} />}
    </label>
  );
};
