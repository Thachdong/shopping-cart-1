"use client";
import { Button } from "@/components/atoms/button";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import {
  createFormDatePicker,
  createFormEditor,
  createFormInput,
  createFormSelect,
} from "@/libs/hocs/with-react-hook-form";
import { useOptions } from "@/libs/hooks/useOptions";
import { createBlogpostAction } from "@/server-actions/blogpost";
import { reFetchResource } from "@/server-actions/cache";
import { getCollOptionsAction } from "@/server-actions/collection";
import { getProductOptionsAction } from "@/server-actions/product";
import { createBlogpostSchema } from "@/validators/blogpost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

const FormInput = createFormInput<TCreateBlogpost>();
const FormSelect = createFormSelect<TCreateBlogpost>();
const FormEditor = createFormEditor<TCreateBlogpost>();
const FormPicker = createFormDatePicker<TCreateBlogpost>();

export const CreateBlogpostForm: React.FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { options: productOptions } = useOptions(getProductOptionsAction);
  const { options: collOptions } = useOptions(getCollOptionsAction);

  const { control, handleSubmit } = useForm<TCreateBlogpost>({
    resolver: zodResolver(createBlogpostSchema),
  });

  const onSubmit = useCallback(
    async (data: TCreateBlogpost) => {
      const { data: result, success } = await createBlogpostAction(data);

      if (success) {
        reFetchResource("/blogposts");

        addToast({
          type: EToastType.success,
          message: "Create post success!",
        });

        router.back();
      } else {
        addToast({ type: EToastType.error, message: result as string });
      }
    },
    [addToast, router],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormInput control={control} name="title" label="Title" />
        <FormInput control={control} name="description" label="Description" />
        <FormSelect
          options={productOptions}
          control={control}
          name="productIds"
          label="Products"
          isMulti
        />
        <FormSelect
          options={collOptions}
          control={control}
          name="collectionIds"
          label="Collections"
          isMulti
        />

        <FormPicker
          control={control}
          name="publishDate"
          id="publishDate"
          label="Publish Date"
          placeholderText="Select date"
        />
      </div>

      <FormEditor control={control} name="post" label="Content" />

      <div className="mt-4 text-center">
        <Button type="submit" className="px-8" variant={EButtonType.primary}>
          Create
        </Button>
      </div>
    </form>
  );
};
