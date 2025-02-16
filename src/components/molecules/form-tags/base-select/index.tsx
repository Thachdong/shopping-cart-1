"use client";
import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";
import { TBaseSelect } from "@/types/form";
import React from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const DEFAULT_CLASSNAME = "flex flex-col gap-2";
const DEFAULT_INPUT_CLASSNAME = "rounded h-9";

export const BaseSelect: React.FC<Readonly<TBaseSelect>> = ({
  id,
  label,
  error,
  className,
  ...selectProps
}) => {
  return (
    <label className={joinClass(DEFAULT_CLASSNAME, className)} htmlFor={id}>
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
