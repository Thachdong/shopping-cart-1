import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { TDatePickerProps } from "@/types/form";
import React from "react";
import DatePicker from "react-datepicker";

const CustomInput = React.forwardRef<
  HTMLButtonElement,
  { value: string; onClick: () => void; id: string }
>(({ value, onClick, id }, ref) => (
  <button
    type="button"
    className="w-full border border-gray-300 h-9 rounded flex items-center justify-between px-2"
    onClick={onClick}
    ref={ref}
    id={id}
  >
    {value || <span className="text-gray-500">Select date</span>}
    <Icon
      className="text-primary-100 ml-2"
      name={EIconName["date-picker-icon"]}
    />
  </button>
));

CustomInput.displayName = "CustomInput";

export const BaseDatePicker: React.FC<Readonly<TDatePickerProps>> = ({
  label,
  id,
  ...pickerProps
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id}>{label}</label>
      <DatePicker
        customInput={
          <CustomInput
            value={""}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            id={""}
          />
        }
        id={id}
        {...pickerProps}
      />
    </div>
  );
};
