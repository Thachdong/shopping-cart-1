import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";
import { TBaseInput } from "@/types/form";
import React from "react";

const DEFAULT_CLASSNAME = "flex flex-col gap-2";
const DEFAULT_INPUT_CLASSNAME = "border border-gray-300 rounded h-9 px-2";

export const BaseInput: React.FC<Readonly<TBaseInput>> = ({
  label,
  id,
  className,
  inputClassName,
  error,
  ...inputProps
}) => {
  return (
    <label className={joinClass(DEFAULT_CLASSNAME, className)} htmlFor={id}>
      {label}
      <input
        className={joinClass(DEFAULT_INPUT_CLASSNAME, inputClassName)}
        id={id}
        {...inputProps}
      />
      {error && <ErrorMessage className="-mt-1" message={error} />}
    </label>
  );
};
