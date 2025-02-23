"use client";
import { Button } from "@/components/atoms/button";
import { ErrorMessage } from "@/components/atoms/error-message";
import { Header } from "@/components/atoms/header";
import { Modal } from "@/components/molecules/modal";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import {
  createFormDatePicker,
  createFormInput,
  createFormSelect,
  createFormTextarea,
} from "@/libs/hocs/with-react-hook-form";
import { useError } from "@/libs/hooks/useError";
import { useModal } from "@/libs/hooks/useModal";
import { useOptions } from "@/libs/hooks/useOptions";
import { updatePostGeneralInfoAction } from "@/server-actions/blogpost";
import { reFetchResource } from "@/server-actions/cache";
import { getCollOptionsAction } from "@/server-actions/collection";
import { getProductOptionsAction } from "@/server-actions/product";
import { updateGeneralPostInfoschema } from "@/validators/blogpost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type TEditGeneralButtonProps = {
  defaultData: TBlogpostGeneralInfo;
};

const FormInput = createFormInput<TBlogpostGeneralInfo>();
const FormSelect = createFormSelect<TBlogpostGeneralInfo>();
const FormTextarea = createFormTextarea<TBlogpostGeneralInfo>();
const FormDatePicker = createFormDatePicker<TBlogpostGeneralInfo>();

export const EditGeneralButton: React.FC<Readonly<TEditGeneralButtonProps>> = ({
  defaultData,
}) => {
  const { open, onClose, onOpen } = useModal();
  const { addError, getError } = useError();
  const { addToast } = useToast();
  const { id } = useParams();
  const { options: productOptions } = useOptions(getProductOptionsAction);
  const { options: collOptions } = useOptions(getCollOptionsAction);

  const { control, handleSubmit, reset } = useForm<TBlogpostGeneralInfo>({
    resolver: zodResolver(updateGeneralPostInfoschema),
  });

  const onSubmit = useCallback(
    async (data: TBlogpostGeneralInfo) => {
      const needToUpdatData: Partial<TBlogpostGeneralInfo> = {};

      if (data.title !== defaultData.title) {
        needToUpdatData.title = data.title;
      }

      if (data.description !== defaultData.description) {
        needToUpdatData.description = data.description;
      }

      if (data.publishDate !== defaultData.publishDate) {
        needToUpdatData.publishDate = data.publishDate;
      }

      if (
        JSON.stringify(data.productIds) !==
        JSON.stringify(defaultData.productIds)
      ) {
        needToUpdatData.productIds = data.productIds;
      }

      if (
        JSON.stringify(data.collectionIds) !==
        JSON.stringify(defaultData.collectionIds)
      ) {
        needToUpdatData.collectionIds = data.collectionIds;
      }

      if (Object.keys(needToUpdatData)?.length === 0) {
        return;
      }

      const { success, data: responseData } = await updatePostGeneralInfoAction(
        Number(id),
        needToUpdatData,
      );

      if (success) {
        reFetchResource(`/blogposts/${id}`);

        addToast({ type: EToastType.success, message: "Update Data Success!" });

        onClose();
      } else {
        addError({ key: "submit", message: responseData as string });
      }
    },
    [id, addError, addToast, onClose, defaultData],
  );

  useEffect(() => {
    if (defaultData) {
      reset(defaultData);
    }
  }, [defaultData, reset]);

  return (
    <>
      <Button onClick={onOpen} variant={EButtonType.outline}>
        Edit
      </Button>

      <Modal
        open={open}
        onClose={onClose}
        header={
          <Header
            level={6}
            className="w-full font-bold text-center text-primary-100 !mb-0"
          >
            Update General Info
          </Header>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput control={control} name="title" label="Title" />
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
          <FormDatePicker
            control={control}
            id="publishDate"
            name="publishDate"
            label="Publish Date"
          />
          <FormTextarea
            control={control}
            name="description"
            label="Description"
          />
          <ErrorMessage message={getError("submit")} />
          <div className="text-center py-4">
            <Button type="submit" variant={EButtonType.primary}>
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
