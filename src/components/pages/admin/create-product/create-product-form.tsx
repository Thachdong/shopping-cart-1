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
import { useOptions } from "@/libs/hooks/useOptions";
import { getCollOptionsAction } from "@/server-actions/collection";
import { getPostOptionsAction } from "@/server-actions/blogpost";

const FormInput = createFormInput<TCreateProductForm>();
const FormSelect = createFormSelect<TCreateProductForm>();

export const CreateProductForm: React.FC = () => {
  const [error, setError] = useState("");
  const { addToast } = useToast();
  const router = useRouter();
  const { options: collOptions } = useOptions(getCollOptionsAction);
  const { options: postOptions } = useOptions(getPostOptionsAction);

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
    async ({ discountPercent, price, ...data }: TCreateProductForm) => {
      if (!displayImage) {
        setError("Diplay image is required!");

        return;
      } else {
        setError("");
      }

      const { data: result, success } = await createProductAction({
        ...data,
        discountPrice: price - ((discountPercent || 0) / price) * 100,
        discountPercent: discountPercent || 0,
        price,
        displayImage,
        thumbnails,
      });

      if (success) {
        reFetchResource("/admin/products");

        addToast({
          type: EToastType.success,
          message: "Create collection success!",
        });

        router.back();
      } else {
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
          options={collOptions}
          name="collectionIds"
          label="Collections"
          placeholder="Select collections"
          isMulti
        />
        <FormSelect
          control={control}
          options={postOptions}
          name="blogpostIds"
          label="Blogposts"
          placeholder="Select posts"
          isMulti
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
          name="discountPercent"
          label="Discount Percent"
          type="number"
          placeholder="Discount percent ..."
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
