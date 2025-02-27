"use client";
import { Button } from "@/components/atoms/button";
import { ErrorMessage } from "@/components/atoms/error-message";
import { Header } from "@/components/atoms/header";
import { Modal } from "@/components/molecules/modal";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import {
  createFormInput,
  createFormSelect,
  createFormTextarea,
} from "@/libs/hocs/with-react-hook-form";
import { useError } from "@/libs/hooks/useError";
import { useModal } from "@/libs/hooks/useModal";
import { useOptions } from "@/libs/hooks/useOptions";
import { getPostOptionsAction } from "@/server-actions/blogpost";
import { reFetchResource } from "@/server-actions/cache";
import { getCollOptionsAction } from "@/server-actions/collection";
import { updateProductGeneralInfoAction } from "@/server-actions/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { array, number, object, string } from "zod";

type TGeneralData = {
  name: string;
  description: string;
  collectionIds: number[];
  blogpostIds: number[];
};

const schema = object({
  name: string(),
  description: string(),
  collectionIds: array(number()).optional(),
  blogpostIds: array(number()).optional(),
});

type TEditGeneralButtonProps = {
  generalData: TGeneralData;
};

const FormInput = createFormInput<TGeneralData>();
const FormTextarea = createFormTextarea<TGeneralData>();
const FormSelect = createFormSelect<TGeneralData>();

export const EditGeneralButton: React.FC<Readonly<TEditGeneralButtonProps>> = ({
  generalData,
}) => {
  const { open, onClose, onOpen } = useModal();
  const { options: collOptions } = useOptions(getCollOptionsAction);
  const { options: postOptions } = useOptions(getPostOptionsAction);
  const { id } = useParams();
  const { addToast } = useToast();
  const { addError, getError } = useError();

  const { control, handleSubmit, reset } = useForm<TGeneralData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: TGeneralData) => {
      const needToUpdateData: Partial<TGeneralData> = {};

      if (data.name !== generalData.name) {
        needToUpdateData.name = data.name;
      }

      if (data.description !== generalData.description) {
        needToUpdateData.description = data.description;
      }

      if (
        JSON.stringify(data.collectionIds) !==
        JSON.stringify(generalData.collectionIds)
      ) {
        needToUpdateData.collectionIds = data.collectionIds;
      }

      if (
        JSON.stringify(data.blogpostIds) !==
        JSON.stringify(generalData.blogpostIds)
      ) {
        needToUpdateData.blogpostIds = data.blogpostIds;
      }

      if (Object.keys(needToUpdateData).length === 0) {
        return;
      }

      const { success, data: responseData } =
        await updateProductGeneralInfoAction(Number(id), needToUpdateData);

      if (success) {
        reFetchResource(`/products/${id}`);

        addToast({ type: EToastType.success, message: "Update Data Success!" });

        onClose();
      } else {
        addError({ key: "submit", message: responseData as string });
      }
    },
    [id, addError, addToast, onClose, generalData],
  );

  useEffect(() => {
    reset(generalData);
  }, [generalData, reset]);

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
            Product Detail
          </Header>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput control={control} name="name" label="Product Name" />
          <FormSelect
            control={control}
            options={collOptions}
            name="collectionIds"
            label="Collections"
            isMulti
          />
          <FormSelect
            control={control}
            options={postOptions}
            name="blogpostIds"
            label="Blogposts"
            isMulti
          />
          <FormTextarea
            control={control}
            name="description"
            label="Description"
          />
          <ErrorMessage message={getError("submit")} />
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
