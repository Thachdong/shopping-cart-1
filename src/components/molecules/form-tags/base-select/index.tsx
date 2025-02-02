import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";
import { TBaseSelect } from "@/types/form";
import React from "react";
import Select from "react-select";

const DEFAULT_CLASSNAME = "flex flex-col gap-2 h-9 px-2";
const DEFAULT_INPUT_CLASSNAME = "rounded h-9";

export const BaseSelect: React.FC<Readonly<TBaseSelect>> = ({
  id,
  label,
  error,
  ...selectProps
}) => {
  return (
    <label className={joinClass(DEFAULT_CLASSNAME)} htmlFor={id}>
      {label}
      <Select
        inputId={id}
        className={DEFAULT_INPUT_CLASSNAME}
        {...selectProps}
      />
      {error && <ErrorMessage className="-mt-1" message={error} />}
    </label>
  );
};
