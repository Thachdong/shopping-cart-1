"use client";
import { BaseDatePicker } from "@/components/molecules/form-tags/base-date-picker";
import { BaseEditor } from "@/components/molecules/form-tags/base-editor";
import { BaseInput } from "@/components/molecules/form-tags/base-input";
import { BaseSelect } from "@/components/molecules/form-tags/base-select";
import { BaseTextarea } from "@/components/molecules/form-tags/base-textarea";
import { BaseUpload } from "@/components/molecules/form-tags/base-upload";
import { UploadAvatar } from "@/components/molecules/form-tags/upload-avatar";
import { UploadThumbnails } from "@/components/molecules/form-tags/upload-thumbnails";
import {
  IWithHookFormProps,
  TBaseEditor,
  TBaseInput,
  TBaseSelect,
  TBaseTextarea,
  TBaseUpload,
  TDatePickerProps,
  TUploadAvatar,
  TUploadThumbnails,
} from "@/types/form";
import { ComponentType } from "react";
import { FieldValues, useController } from "react-hook-form";

export function withHookForm<T extends FieldValues, K>(
  Component: ComponentType<K>,
) {
  return function WrapperComponent(props: IWithHookFormProps<T> & K) {
    const { control, name, defaultValue, rules, ...componentProps } = props;

    const {
      field: { value = "", ref, ...restField }, // eslint-disable-line @typescript-eslint/no-unused-vars
      fieldState: { error },
    } = useController({
      control,
      name,
      rules,
      defaultValue,
    });

    return (
      <Component
        id={name}
        error={error?.message}
        value={value}
        {...restField}
        {...(componentProps as unknown as K)}
      />
    );
  };
}

export function createFormInput<T extends FieldValues>() {
  return withHookForm<T, TBaseInput>(BaseInput);
}

export function createFormTextarea<T extends FieldValues>() {
  return withHookForm<T, TBaseTextarea>(BaseTextarea);
}

export function createFormEditor<T extends FieldValues>() {
  return withHookForm<T, TBaseEditor>(BaseEditor);
}

export function createFormSelect<T extends FieldValues>() {
  return withHookForm<T, TBaseSelect>(BaseSelect);
}

export function createFormUpload<T extends FieldValues>() {
  return withHookForm<T, TBaseUpload>(BaseUpload);
}

export function createFormUploadAvatar<T extends FieldValues>() {
  return withHookForm<T, TUploadAvatar>(UploadAvatar);
}

export function createFormUploadThumbnails<T extends FieldValues>() {
  return withHookForm<T, TUploadThumbnails>(UploadThumbnails);
}

export function createFormDatePicker<T extends FieldValues>() {
  return withHookForm<T, TDatePickerProps>(BaseDatePicker);
}
