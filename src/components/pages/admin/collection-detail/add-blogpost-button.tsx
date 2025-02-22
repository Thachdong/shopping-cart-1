"use client";
import { Button } from "@/components/atoms/button";
import { ErrorMessage } from "@/components/atoms/error-message";
import { Header } from "@/components/atoms/header";
import { Modal } from "@/components/molecules/modal";
import { EButtonType, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import { createFormSelect } from "@/libs/hocs/with-react-hook-form";
import { useError } from "@/libs/hooks/useError";
import { useModal } from "@/libs/hooks/useModal";
import { useOptions } from "@/libs/hooks/useOptions";
import { getPostOptionsAction } from "@/server-actions/blogpost";
import { addPostsToCollAction } from "@/server-actions/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { array, number, object } from "zod";

type TFormState = {
  postIds: number[];
};

type TAddBlogpostButtonProps = {
  postIds: number[];
  fetchPosts: () => void;
};

const schema = object({
  postIds: array(number()).min(1),
});

const FormSelect = createFormSelect<TFormState>();

export const AddBlogpostButton: React.FC<Readonly<TAddBlogpostButtonProps>> = ({
  postIds,
  fetchPosts,
}) => {
  const { open, onClose, onOpen } = useModal();
  const { options } = useOptions(getPostOptionsAction);
  const { control, handleSubmit } = useForm<TFormState>({
    resolver: zodResolver(schema),
  });
  const { id } = useParams();
  const { addToast } = useToast();
  const { addError, getError } = useError();

  const onSubmit = useCallback(
    async (data: TFormState) => {
      const { success, data: responseData } = await addPostsToCollAction(
        Number(id),
        data.postIds,
      );

      if (success) {
        fetchPosts();

        addToast({ type: EToastType.success, message: "Add Posts Success!" });

        onClose();
      } else {
        addError({ key: "submit", message: responseData as string });
      }
    },
    [id, fetchPosts, addToast, addError, onClose],
  );

  const postOptions = useMemo(() => {
    return options.filter((opt) => !postIds.includes(Number(opt.value)));
  }, [options, postIds]);

  return (
    <>
      <Button onClick={onOpen} variant={EButtonType.outline}>
        Add Blogposts
      </Button>

      <Modal
        open={open}
        onClose={onClose}
        header={
          <Header level={6} className="!mb-0 text-center font-bold w-full">
            Add Blogposts To Collection
          </Header>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            control={control}
            options={postOptions}
            name="postIds"
            label="Blogposts"
            isMulti={true}
          />

          <ErrorMessage message={getError("submit")} />

          <div className="text-center my-4">
            <Button type="submit" variant={EButtonType.primary}>
              Add
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
