import { joinClass } from "@/helpers/style";
import { TBaseSelect } from "@/types/form";
import React from "react";
import Select from "react-select";

const DEFAULT_CLASSNAME = "flex flex-col gap-2 h-9 px-2";
const DEFAULT_INPUT_CLASSNAME = "rounded h-9";
const ERROR_CLASSNAME = "text-red-500 text-sm italic -mt-1";

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
      {error && <span className={ERROR_CLASSNAME}>{error}</span>}
    </label>
  );
};
