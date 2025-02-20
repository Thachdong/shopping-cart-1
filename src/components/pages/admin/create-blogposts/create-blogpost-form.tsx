"use client";
import { Button } from "@/components/atoms/button";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import {
  // createFormEditor,
  createFormInput,
  createFormSelect,
} from "@/libs/hocs/with-react-hook-form";
import { createBlogpostAction } from "@/server-actions/blogpost";
import { reFetchResource } from "@/server-actions/cache";
import { createBlogpostSchema } from "@/validators/blogpost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

const FormInput = createFormInput<TCreateBlogpost>();
const FormSelect = createFormSelect<TCreateBlogpost>();
// const FormEditor = createFormEditor<TCreateBlogpost>();

export const CreateBlogpostForm: React.FC = () => {
  const { control, handleSubmit } = useForm<TCreateBlogpost>({
    resolver: zodResolver(createBlogpostSchema),
    defaultValues: {
      post: "my post",
    },
  });

  const router = useRouter();
  const { addToast } = useToast();

  const onSubmit = useCallback(async (data: TCreateBlogpost) => {
    const { data: result, success } = await createBlogpostAction(data);

    if (success) {
      reFetchResource("/admin/blogposts");

      addToast({
        type: EToastType.success,
        message: "Create post success!",
      });

      router.back();
    } else {
      addToast({ type: EToastType.error, message: result as string });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      {/* <FormEditor control={control} name="post" label="Content" /> */}

      <div className="mt-4 text-center">
        <Button type="submit" className="px-8" variant={EButtonType.primary}>
          Create
        </Button>
      </div>
    </form>
  );
};
