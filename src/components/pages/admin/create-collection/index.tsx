"use client";
import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { EButtonType } from "@/constants";
import {
  createFormInput,
  createFormSelect,
  createFormUploadBanner,
} from "@/libs/hocs/with-react-hook-form";
import { createCollectionSchema } from "@/validators/collection.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

const FormInput = createFormInput<TCreateCollection>();
const UploadBanner = createFormUploadBanner<TCreateCollection>();
const FormSelect = createFormSelect<TCreateCollection>();

export const CreateCollection: React.FC = () => {
  const { control, handleSubmit } = useForm<TCreateCollection>({
    resolver: zodResolver(createCollectionSchema),
  });

  const onSubmit = useCallback((data: TCreateCollection) => {
    console.log(data);
  }, []);

  return (
    <>
      <Header level={1}>Create Collection</Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormInput control={control} name="name" label="Collection Name" />

          <FormInput control={control} name="description" label="Description" />

          <FormSelect
            control={control}
            name="productIds"
            options={[]}
            label="Products"
          />

          <FormSelect
            control={control}
            name="blogpostIds"
            options={[]}
            label="Blogposts"
          />
        </div>

        <div className="mb-2">Collection Banner</div>

        <UploadBanner control={control} name="bannerId" />

        <div className="text-center mt-4">
          <Button className="px-8" variant={EButtonType.primary}>
            Create
          </Button>
        </div>
      </form>
    </>
  );
};
