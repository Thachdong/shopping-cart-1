"use client";
import { Button } from "@/components/atoms/button";
import { ErrorMessage } from "@/components/atoms/error-message";
import { Header } from "@/components/atoms/header";
import { UploadBanner } from "@/components/molecules/form-tags/upload-banner";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import { useRcUpload } from "@/libs/hooks/useRcUpload";
import {
  createFormInput,
  createFormSelect,
} from "@/libs/hocs/with-react-hook-form";
import { createCollectionAction } from "@/server-actions/collection";
import { TCreateCollection } from "@/types/collections";
import { createCollectionSchema } from "@/validators/collection.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { reFetchResource } from "@/server-actions/cache";

const FormInput = createFormInput<TCreateCollection>();
const FormSelect = createFormSelect<TCreateCollection>();
const defaultValues: TCreateCollection = {
  name: "",
  description: "",
  productIds: [],
  blogpostIds: [],
};

export const CreateCollection: React.FC = () => {
  const { action, uploadedFile, removeSingleFile } = useRcUpload();
  const [error, setError] = useState("");
  const { addToast } = useToast();
  const router = useRouter();

  const { control, handleSubmit } = useForm<TCreateCollection>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: TCreateCollection) => {
      if (!uploadedFile) {
        setError("Banner is required!");

        return;
      } else {
        setError("");
      }

      const payload = { ...data, banner: uploadedFile };

      const { success, data: result } = await createCollectionAction(payload);

      if (success) {
        addToast({
          type: EToastType.success,
          message: "Create collection success!",
        });

        router.back();
      } else {
        reFetchResource("/admin/collections");

        addToast({ type: EToastType.error, message: result as string });
      }
    },
    [uploadedFile, router, addToast],
  );

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
            id="productIds"
            options={[]}
            label="Products"
          />

          <FormSelect
            control={control}
            name="blogpostIds"
            id="blogpostIds"
            options={[]}
            label="Blogposts"
          />
        </div>

        <div className="mb-2">
          Collection Banner
          <ErrorMessage message={error} />
        </div>

        <UploadBanner
          action={action}
          uploadedFile={uploadedFile}
          onDelete={removeSingleFile}
        />

        <div className="text-center mt-4">
          <Button className="px-8" variant={EButtonType.primary}>
            Create
          </Button>
        </div>
      </form>
    </>
  );
};
