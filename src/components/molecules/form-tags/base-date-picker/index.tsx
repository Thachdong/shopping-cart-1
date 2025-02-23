"use client";
import { ErrorMessage } from "@/components/atoms/error-message";
import { TDatePickerProps } from "@/types/form";
import React, { useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";

export const BaseDatePicker: React.FC<Readonly<TDatePickerProps>> = ({
  label,
  id,
  onChange,
  value,
  error,
  ...pickerProps
}) => {
  const handleChange = useCallback(
    (date: Date | null) => {
      if (date) {
        onChange?.(date.toISOString());
      }
    },
    [onChange],
  );

  const selected = useMemo(() => {
    const date = new Date(value as string);

    return isNaN(date.getTime()) ? null : date;
  }, [value]);
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={id}>{label}</label>
      {/* @ts-expect-error: ignore unknow check */}
      <DatePicker
        id={id}
        popperClassName="z-50"
        className="w-full border border-gray-300 rounded leading-[38px] px-2"
        selected={selected}
        onChange={handleChange}
        {...pickerProps}
      />

      <ErrorMessage message={error ?? ""} />
    </div>
  );
};
