"use client";
import { Header } from "@/components/atoms/header";
import {
  createFormInput,
  createFormTextarea,
  createFormUploadBanner,
} from "@/libs/hocs/with-react-hook-form";
import { createCollectionSchema } from "@/validators/collection.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FormInput = createFormInput<TCreateCollection>();
const FormTextarea = createFormTextarea<TCreateCollection>();
const UploadBanner = createFormUploadBanner<TCreateCollection>();

export const CreateCollection: React.FC = () => {
  const { control } = useForm<TCreateCollection>({
    resolver: zodResolver(createCollectionSchema),
  });

  return (
    <>
      <Header level={1}>Create Collection</Header>

      <form className="flex flex-col gap-4">
        <FormInput control={control} name="name" label="Collection Name" />

        <FormTextarea
          control={control}
          name="description"
          label="Description"
          rows={4}
        />

        <UploadBanner control={control} name="bannerId" />
      </form>
    </>
  );
};
