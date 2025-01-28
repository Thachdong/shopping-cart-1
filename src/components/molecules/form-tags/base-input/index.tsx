import { joinClass } from "@/helpers/style";
import { TBaseInput } from "@/types/form";
import React from "react";

const DEFAULT_CLASSNAME = "flex flex-col gap-2";
const DEFAULT_INPUT_CLASSNAME = "border border-gray-300 rounded h-9 px-2";
const DEFAULT_ERROR_CLASSNAME = "text-red-500 text-sm italic -mt-1";

export const BaseInput: React.FC<Readonly<TBaseInput>> = ({
  label,
  id,
  className,
  error,
  ...inputProps
}) => {
  return (
    <label className={joinClass(DEFAULT_CLASSNAME, className)} htmlFor={id}>
      {label}
      <input className={DEFAULT_INPUT_CLASSNAME} id={id} {...inputProps} />
      {error && <span className={DEFAULT_ERROR_CLASSNAME}>{error}</span>}
    </label>
  );
};
