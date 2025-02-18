"use client";
import {
  createFormInput,
  createFormSelect,
} from "@/libs/hocs/with-react-hook-form";
import React from "react";
import { useForm } from "react-hook-form";
import { createProductSchema } from "@/validators/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/button";
import { EButtonType } from "@/constants";
import { useRcUpload } from "@/libs/hooks/useRcUpload";
import { UploadDisplayImage } from "@/components/molecules/form-tags/upload-display-image";
import { UploadThumbnails } from "@/components/molecules/form-tags/upload-thumbnails";
import { TUploadedFile } from "@/types/form";

const FormInput = createFormInput<TCreateProductForm>();
const FormSelect = createFormSelect<TCreateProductForm>();

export const CreateProductForm: React.FC = () => {
  const {
    action: displayImageAction,
    uploadedFile: displayImage,
    removeSingleFile: removeDisplayImage,
  } = useRcUpload();

  const {
    action: thumbnailsAction,
    uploadedFile: thumbnails = [],
    removeFileById: removeThumbnailById,
  } = useRcUpload<TUploadedFile[]>({ isMulti: true });

  const { control } = useForm<TCreateProductForm>({
    resolver: zodResolver(createProductSchema),
  });

  return (
    <form>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormInput
          control={control}
          name="name"
          label="Product Name"
          placeholder="Product name ..."
        />
        <FormInput
          control={control}
          name="description"
          label="Product Description"
          placeholder="Product description ..."
        />
        <FormSelect
          control={control}
          options={[]}
          name="collectionIds"
          label="Collections"
          placeholder="Select collections"
        />
        <FormSelect
          control={control}
          options={[]}
          name="blogpostIds"
          label="Blogposts"
          placeholder="Select posts"
        />
        <FormInput
          control={control}
          name="color"
          label="Product Color"
          placeholder="Product color ..."
        />
        <FormInput
          control={control}
          name="size"
          label="Product Size"
          placeholder="Product size ..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <FormInput
          control={control}
          name="price"
          label="Product Price"
          type="number"
          placeholder="Product price ..."
        />
        <FormInput
          control={control}
          name="stock"
          label="Product Stock"
          type="number"
          placeholder="Product stock ..."
        />
        <FormInput
          control={control}
          name="percentOff"
          label="Percent Off"
          type="number"
          placeholder="Percent off ..."
        />
      </div>

      <UploadDisplayImage
        action={displayImageAction}
        uploadedFile={displayImage}
        onDelete={removeDisplayImage}
        displayClassName="mb-4"
      />

      <UploadThumbnails
        action={thumbnailsAction}
        uploadedFile={thumbnails}
        onDelete={removeThumbnailById}
      />

      <div className="mt-4 text-center">
        <Button variant={EButtonType.primary} className="px-12">
          Create
        </Button>
      </div>
    </form>
  );
};
