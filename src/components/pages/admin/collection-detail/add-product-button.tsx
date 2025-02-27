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
import { addProductsToCollAction } from "@/server-actions/collection";
import { getProductOptionsAction } from "@/server-actions/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { array, number, object } from "zod";

type TFormState = {
  productIds: number[];
};

type TAddProductButtonProps = {
  productIds: number[];
  fetchProducts: () => void;
};

const schema = object({
  productIds: array(number()).min(1),
});

const FormSelect = createFormSelect<TFormState>();

export const AddProductButton: React.FC<Readonly<TAddProductButtonProps>> = ({
  productIds,
  fetchProducts,
}) => {
  const { open, onClose, onOpen } = useModal();
  const { options } = useOptions(getProductOptionsAction);
  const { control, handleSubmit } = useForm<TFormState>({
    resolver: zodResolver(schema),
  });
  const { id } = useParams();
  const { addToast } = useToast();
  const { addError, getError } = useError();

  const onSubmit = useCallback(
    async (data: TFormState) => {
      const { success, data: responseData } = await addProductsToCollAction(
        Number(id),
        data.productIds,
      );

      if (success) {
        fetchProducts();

        addToast({
          type: EToastType.success,
          message: "Add Products Success!",
        });

        onClose();
      } else {
        addError({ key: "submit", message: responseData as string });
      }
    },
    [id, fetchProducts, addError, addToast, onClose],
  );

  const productOptions = useMemo(() => {
    return options.filter((opt) => !productIds.includes(Number(opt.value)));
  }, [productIds, options]);

  return (
    <>
      <Button onClick={onOpen} variant={EButtonType.outline}>
        Add Products
      </Button>

      <Modal
        open={open}
        onClose={onClose}
        header={
          <Header level={6} className="!mb-0 text-center font-bold w-full">
            Add Products To Collection
          </Header>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSelect
            control={control}
            options={productOptions}
            name="productIds"
            label="Products"
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
