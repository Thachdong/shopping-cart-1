"use client";
import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { S3Image } from "@/components/atoms/s3-image";
import Table from "@/components/molecules/table";
import { EIconName, EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";
import { reFetchResource } from "@/server-actions/cache";
import { removeVariantAction } from "@/server-actions/product";
import { TProductDetailVariant } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

type TVariantsTable = {
  variants: TProductDetailVariant[];
};

export const VariantsTable: React.FC<TVariantsTable> = ({ variants }) => {
  const { id } = useParams();
  const { addToast } = useToast();

  const removeVariant = useCallback(
    async (variantId: number) => {
      const { success, data } = await removeVariantAction(
        Number(id),
        variantId,
      );

      if (success) {
        reFetchResource(`/products/${id}`);

        addToast({
          type: EToastType.success,
          message: "Remove Variant Success!",
        });
      } else {
        addToast({ type: EToastType.error, message: data as string });
      }
    },
    [id, addToast],
  );

  const cols: ColumnDef<TProductDetailVariant>[] = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "variantName",
      },
      {
        header: "Color",
        accessorKey: "color",
      },
      {
        header: "Size",
        accessorKey: "size",
      },
      {
        header: "Price (VND)",
        accessorKey: "price",
        cell: ({ row }) => <PriceBox price={row.original.price} />,
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Percent Off (%)",
        accessorKey: "discountPercent",
      },
      {
        header: "Thumnails",
        accessorKey: "thumbnails",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            {row.original.thumbnails.map((img) => (
              <S3Image
                key={img.id}
                image={img}
                width={75}
                height={45}
                alt={img.filename}
              />
            ))}
          </div>
        ),
      },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => (
          <Icon
            onClick={() => removeVariant(row.original.id)}
            className="cursor-pointer"
            name={EIconName.trash}
          />
        ),
      },
    ],
    [removeVariant],
  );

  return <Table key={variants?.length} columns={cols} data={variants} />;
};
