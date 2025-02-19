"use client";
import {
  createFormInput,
  createFormSelect,
} from "@/libs/hocs/with-react-hook-form";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createProductSchema } from "@/validators/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/button";
import { EButtonType, EToastType } from "@/constants";
import { useRcUpload } from "@/libs/hooks/useRcUpload";
import { UploadDisplayImage } from "@/components/molecules/form-tags/upload-display-image";
import { UploadThumbnails } from "@/components/molecules/form-tags/upload-thumbnails";
import { TUploadedFile } from "@/types/form";
import { TCreateProductForm } from "@/types/product";
import { createProductAction } from "@/server-actions/product";
import { useToast } from "@/libs/contexts/toast-context";
import { reFetchResource } from "@/server-actions/cache";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/atoms/error-message";

const FormInput = createFormInput<TCreateProductForm>();
const FormSelect = createFormSelect<TCreateProductForm>();

export const CreateProductForm: React.FC = () => {
  const [error, setError] = useState("");
  const { addToast } = useToast();
  const router = useRouter();

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

  const { control, handleSubmit } = useForm<TCreateProductForm>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = useCallback(
    async (data: TCreateProductForm) => {
      if (!displayImage) {
        setError("Diplay image is required!");

        return;
      } else {
        setError("");
      }

      const { data: result, success } = await createProductAction({
        ...data,
        displayImage,
        thumbnails,
      });

      if (success) {
        addToast({
          type: EToastType.success,
          message: "Create collection success!",
        });

        router.back();
      } else {
        reFetchResource("/admin/products");

        addToast({ type: EToastType.error, message: result as string });
      }
    },
    [thumbnails, displayImage, addToast, router],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          name="variantName"
          label="Variant name"
          placeholder="Variant name ..."
        />
        <FormInput
          control={control}
          name="color"
          label="Variant Color"
          placeholder="Variant color ..."
        />
        <FormInput
          control={control}
          name="size"
          label="Variant Size"
          placeholder="Variant size ..."
        />

        <FormInput
          control={control}
          name="price"
          label="Variant Price"
          type="number"
          placeholder="Variant price ..."
        />
        <FormInput
          control={control}
          name="stock"
          label="Variant Stock"
          type="number"
          placeholder="Variant stock ..."
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

      <ErrorMessage message={error} />

      <UploadThumbnails
        action={thumbnailsAction}
        uploadedFile={thumbnails}
        onDelete={removeThumbnailById}
      />

      <div className="mt-4 text-center">
        <Button type="submit" variant={EButtonType.primary} className="px-12">
          Create
        </Button>
      </div>
    </form>
  );
};
