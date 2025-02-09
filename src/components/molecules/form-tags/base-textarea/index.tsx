import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";
import { TBaseTextarea } from "@/types/form";
import React from "react";

const DEFAULT_CLASSNAME = "flex flex-col gap-2";
const DEFAULT_INPUT_CLASSNAME = "border border-gray-300 rounded px-2";

export const BaseTextarea: React.FC<Readonly<TBaseTextarea>> = ({
  label,
  id,
  className,
  error,
  ...inputProps
}) => {
  return (
    <label className={joinClass(DEFAULT_CLASSNAME, className)} htmlFor={id}>
      {label}
      <textarea className={DEFAULT_INPUT_CLASSNAME} id={id} {...inputProps} />
      {error && <ErrorMessage className="-mt-1" message={error} />}
    </label>
  );
};
