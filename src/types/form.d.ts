import { Props as SelectProps } from "react-select";
import { UploadProps } from "rc-upload";
import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";

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

type TBaseUpload = UploadProps;

type TBaseEditor = {
  label?: string;
  error?: string;
  initialValue?: string;
  init: InitOptions;
};

type TUploadAvatar = TBaseUpload & {
  width: number;
  height?: number;
  avatarClassName?: string;
};
