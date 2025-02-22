"use client";
import { ErrorMessage } from "@/components/atoms/error-message";
import { joinClass } from "@/helpers/style";
import { TBaseSelect, TSelectOption } from "@/types/form";
import React, { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const DEFAULT_CLASSNAME = "flex flex-col gap-2 relative z-[1001]";
const DEFAULT_INPUT_CLASSNAME = "rounded h-9";

export const BaseSelect: React.FC<Readonly<TBaseSelect>> = ({
  id,
  label,
  error,
  className,
  onChange,
  value,
  options,
  isMulti,
  ...selectProps
}) => {
  const handleChange = useCallback(
    (newVal: unknown) => {
      if (isMulti) {
        const selectedOptions = (newVal as TSelectOption[]) || [];

        onChange?.(selectedOptions.map((opt) => opt.value));
      } else {
        const { value } = (newVal as TSelectOption) || {};

        onChange?.(value);
      }
    },
    [onChange, isMulti],
  );

  const selectedOption = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return options.filter((opt) => value?.includes(opt.value));
    } else {
      return options.find((opt) => opt.value === value);
    }
  }, [value, options, isMulti]);

  return (
    <label className={joinClass(DEFAULT_CLASSNAME, className)} htmlFor={id}>
      {label}
      <Select
        inputId={id}
        className={DEFAULT_INPUT_CLASSNAME}
        onChange={handleChange}
        value={selectedOption}
        options={options}
        isMulti={true}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        {...selectProps}
      />
      {error && <ErrorMessage className="-mt-1" message={error} />}
    </label>
  );
};
