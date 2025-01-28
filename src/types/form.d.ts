import { Props as SelectProps } from "react-select";

type TBaseInput = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value"
> & {
  value: string | number;
  id: string;
  error?: string;
  className?: string;
  label?: React.ReactNode;
  validate?: (value: string | number) => boolean;
};

type TSelectOption = {
  value: string | number;
  label: string;
};

type TBaseSelect = Omit<SelectProps, "options" | "isMulti"> & {
  id: string;
  label: string;
  options: TSelectOption[];
  error?: string;
};
