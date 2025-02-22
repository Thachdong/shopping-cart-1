"use client";
import { Button } from "@/components/atoms/button";
import { ErrorMessage } from "@/components/atoms/error-message";
import { Header } from "@/components/atoms/header";
import { UploadBanner } from "@/components/molecules/form-tags/upload-banner";
import { Modal } from "@/components/molecules/modal";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import {
  createFormInput,
  createFormTextarea,
} from "@/libs/hocs/with-react-hook-form";
import { useError } from "@/libs/hooks/useError";
import { useModal } from "@/libs/hooks/useModal";
import { useRcUpload } from "@/libs/hooks/useRcUpload";
import { reFetchResource } from "@/server-actions/cache";
import { updateCollGeneralInfoAction } from "@/server-actions/collection";
import {
  TEditGeneralButtonProps,
  TUpdateCollGeneralInfo,
} from "@/types/collections";
import { updateGeneralCollSchema } from "@/validators/collection.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

type TFormState = {
  name: string;
  description: string;
};

const FormInput = createFormInput<TFormState>();
const FormTextarea = createFormTextarea<TFormState>();

export const EditGeneralButton: React.FC<Readonly<TEditGeneralButtonProps>> = ({
  ...detailData
}) => {
  const { open, onClose, onOpen } = useModal();

  const { getError, addError, removeError } = useError();

  const { addToast } = useToast();

  const { id } = useParams();

  const { action, uploadedFile, removeSingleFile } = useRcUpload({
    defaultValue: detailData.banner,
  });

  const { control, handleSubmit } = useForm<TFormState>({
    resolver: zodResolver(updateGeneralCollSchema),
    defaultValues: {
      name: detailData.name,
      description: detailData.description,
    },
  });

  const onSubmit = useCallback(
    async (data: TFormState) => {
      if (!uploadedFile) {
        addError({ key: "banner", message: "Banner is required!" });

        return;
      } else {
        removeError("banner");
      }

      const needToUpdateData: TUpdateCollGeneralInfo = { id: Number(id) };

      if (JSON.stringify(uploadedFile) !== JSON.stringify(detailData.banner)) {
        needToUpdateData.banner = uploadedFile;
      }

      if (detailData.name !== data.name) {
        needToUpdateData.name = data.name;
      }

      if (detailData.description !== data.description) {
        needToUpdateData.description = data.description;
      }

      const { success, data: responseData } =
        await updateCollGeneralInfoAction(needToUpdateData);
      if (success) {
        reFetchResource(`/collections/${id}`);

        addToast({ type: EToastType.success, message: "Edit data success!" });

        onClose();
      } else {
        addError({ key: "submit", message: responseData as string });
      }
    },
    [uploadedFile, id],
  );
  return (
    <>
      <Button onClick={onOpen} variant={EButtonType.outline}>
        Edit
      </Button>

      <Modal
        open={open}
        onClose={onClose}
        header={
          <Header level={6} className="!mb-0 text-center font-bold w-full">
            Collection Detail
          </Header>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput control={control} name="name" label="Collection Name" />

          <FormTextarea
            control={control}
            name="description"
            label="Description"
          />

          <div>
            <div className="mb-2">
              Collection Banner
              <ErrorMessage message={getError("banner")} />
            </div>

            <UploadBanner
              action={action}
              uploadedFile={uploadedFile}
              onDelete={removeSingleFile}
              bannerClassName="w-full !h-[75px]"
            />
          </div>

          <div className="text-center">
            <Button type="submit" variant={EButtonType.primary}>
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
