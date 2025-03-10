"use client";
import { Button } from "@/components/atoms/button";
import { ErrorMessage } from "@/components/atoms/error-message";
import { Header } from "@/components/atoms/header";
import { UploadThumbnails } from "@/components/molecules/form-tags/upload-thumbnails";
import { Modal } from "@/components/molecules/modal";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import { createFormInput } from "@/libs/hocs/with-react-hook-form";
import { useError } from "@/libs/hooks/useError";
import { useModal } from "@/libs/hooks/useModal";
import { useRcUpload } from "@/libs/hooks/useRcUpload";
import { reFetchResource } from "@/server-actions/cache";
import { createVariantAction } from "@/server-actions/product";
import { TUploadedFile } from "@/types/form";
import { TCreateVariantServiceParams } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "zod";

const schema = object({
  variantName: string(),
  color: string(),
  size: string(),
  price: number(),
  stock: number(),
  discountPercent: number().optional(),
});

const FormInput = createFormInput<TCreateVariantServiceParams>();

export const AddVariantButton: React.FC = () => {
  const { open, onOpen, onClose } = useModal();
  const { addToast } = useToast();
  const { addError, getError, removeError } = useError();
  const { id } = useParams();
  const {
    action,
    uploadedFile = [],
    removeFileById,
  } = useRcUpload<TUploadedFile[]>({ isMulti: true });

  const { control, handleSubmit } = useForm<TCreateVariantServiceParams>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: TCreateVariantServiceParams) => {
      if (!uploadedFile || uploadedFile?.length === 0) {
        addError({ key: "thumbnails", message: "Thumbnails is required!" });

        return;
      } else {
        removeError("thumbnails");
      }

      const { success, data: responseData } = await createVariantAction(
        Number(id),
        {
          ...data,
          thumbnails: [...uploadedFile],
        },
      );

      if (success) {
        reFetchResource(`/products/${id}`);

        addToast({ type: EToastType.success, message: "Add Variant Success!" });

        onClose();
      } else {
        addError({ key: "submit", message: responseData as string });
      }
    },
    [uploadedFile, id, addToast, addError, onClose, removeError],
  );
  return (
    <>
      <Button onClick={onOpen} variant={EButtonType.outline}>
        Add
      </Button>

      <Modal
        open={open}
        onClose={onClose}
        header={
          <Header
            level={6}
            className="text-primary-100 !mb-0 text-center w-full font-bold"
          >
            Create Variant
          </Header>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput control={control} name="variantName" label="Name" />
          <FormInput control={control} name="color" label="Color" />
          <FormInput control={control} name="size" label="Size" />
          <FormInput
            control={control}
            name="price"
            label="Price"
            type="number"
          />
          <FormInput
            control={control}
            name="stock"
            label="Stock"
            type="number"
          />
          <FormInput
            control={control}
            name="discountPercent"
            label="Percent Off"
            type="number"
          />
          <div>
            <div>
              Thumbnails
              <ErrorMessage message={getError("thumbnails")} />
            </div>
            <UploadThumbnails
              action={action}
              uploadedFile={uploadedFile}
              onDelete={removeFileById}
            />
          </div>
          <div className="mt-4 text-center">
            <Button
              type="submit"
              variant={EButtonType.primary}
              className="px-12"
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
