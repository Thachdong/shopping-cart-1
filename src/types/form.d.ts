import { Props as SelectProps } from "react-select";
import { UploadProps } from "rc-upload";
import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
import { Control, FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";

type TBaseInput = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value"
> & {
  value?: string | number;
  id?: string;
  error?: string;
  label?: React.ReactNode;
  validate?: (value: string | number) => boolean;
  inputClassName?: string;
};

type TBaseTextarea = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  id?: string;
  error?: string;
  label?: React.ReactNode;
  validate?: (value: string | number) => boolean;
  inputClassName?: string;
};

type TSelectOption = {
  value: string | number;
  label: string;
};

type TBaseSelect = Omit<SelectProps, "options" | "isMulti"> & {
  label: string;
  options: TSelectOption[];
  error?: string;
};

type TBaseUpload = UploadProps;

type TBaseEditor = {
  label?: string;
  error?: string;
  initialValue?: string;
  init?: InitOptions;
};

type TUploadAvatar = TBaseUpload & {
  width?: number;
  height?: number;
  avatarClassName?: string;
  onDelete?: () => void;
};

type TUploadDisplayImg = TBaseUpload & {
  width?: number;
  height?: number;
  displayClassName?: string;
  onDelete?: () => void;
};

type TUploadBanner = TBaseUpload & {
  width?: number;
  height?: number;
  bannerClassName?: string;
  onDelete?: () => void;
};

type TUploadThumbnails = Omit<TBaseUpload, "value"> & {
  value?: string[];
  width?: number;
  height?: number;
  imgClassName?: string;
  thumbnailsClassName?: string;
  onDelete?: (img: string) => void;
};

interface IWithHookFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  defaultValue?: T[keyof T];
}

type TFormPassword = {
  inputTag: ReactNode;
  type: "text" | "password";
  setType: () => void;
};
