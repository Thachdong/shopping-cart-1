"use client";
import { Button } from "@/components/atoms/button";
import { EButtonType } from "@/constants";
import {
  createFormEditor,
  createFormInput,
  createFormSelect,
} from "@/libs/hocs/with-react-hook-form";
import { createBlogpostSchema } from "@/validators/blogpost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FormInput = createFormInput<TCreateBlogpost>();
const FormSelect = createFormSelect<TCreateBlogpost>();
const FormEditor = createFormEditor<TCreateBlogpost>();

export const CreateBlogpostForm: React.FC = () => {
  const { control } = useForm<TCreateBlogpost>({
    resolver: zodResolver(createBlogpostSchema),
  });

  return (
    <form>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormInput control={control} name="title" label="Title" />
        <FormInput control={control} name="description" label="Description" />
        <FormSelect
          options={[]}
          control={control}
          name="productIds"
          label="Products"
        />
        <FormSelect
          options={[]}
          control={control}
          name="collectionIds"
          label="Collections"
        />
      </div>
      <FormInput
        control={control}
        name="publishDate"
        label="Publish Date"
        className="mb-4"
      />
      <FormEditor control={control} name="content" label="Content" />
      <div className="mt-4 text-center">
        <Button className="px-8" variant={EButtonType.primary}>
          Create
        </Button>
      </div>
    </form>
  );
};
