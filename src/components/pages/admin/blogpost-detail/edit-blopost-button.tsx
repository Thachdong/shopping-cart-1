"use client";

import { Button } from "@/components/atoms/button";
import { ErrorMessage } from "@/components/atoms/error-message";
import { Header } from "@/components/atoms/header";
import { Modal } from "@/components/molecules/modal";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import { createFormEditor } from "@/libs/hocs/with-react-hook-form";
import { useError } from "@/libs/hooks/useError";
import { useModal } from "@/libs/hooks/useModal";
import { updatePostAction } from "@/server-actions/blogpost";
import { reFetchResource } from "@/server-actions/cache";
import { updatPostSchema } from "@/validators/blogpost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type TPost = {
  post: string;
};

type TEditPostProps = {
  defaultData: TPost;
};

const FormEditor = createFormEditor<TPost>();

export const EditBlogpostButton: React.FC<TEditPostProps> = ({
  defaultData,
}) => {
  const { id } = useParams();
  const { open, onClose, onOpen } = useModal();
  const { addToast } = useToast();
  const { addError, getError } = useError();

  const { control, handleSubmit, reset } = useForm<TPost>({
    resolver: zodResolver(updatPostSchema),
  });

  const onSubmit = useCallback(
    async (data: TPost) => {
      if (defaultData.post === data.post) return;

      const { success, data: responseData } = await updatePostAction(
        Number(id),
        data.post,
      );

      if (success) {
        reFetchResource(`/blogposts/${id}`);

        addToast({ type: EToastType.success, message: "Update Post Success!" });

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
            Update Post
          </Header>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormEditor control={control} name="post" label="Post" />
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
