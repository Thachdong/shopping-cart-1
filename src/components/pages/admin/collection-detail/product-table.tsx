"use client";
import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath, EToastType } from "@/constants";
import { genPath } from "@/helpers/router";
import { useToast } from "@/libs/contexts/toast-context";
import { removeCollProductAction } from "@/server-actions/collection";
import { TProductTable } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";

type TProductTableProps = {
  products: TProductTable[];
  fetchProducts: () => void;
};

export const ProductTable: React.FC<Readonly<TProductTableProps>> = ({
  products,
  fetchProducts,
}) => {
  const { addToast } = useToast();
  const { id } = useParams();

  const removeCollProduct = useCallback(
    async (productId: number) => {
      const { success, data } = await removeCollProductAction(
        Number(id),
        productId,
      );

      if (success) {
        await fetchProducts();

        addToast({
          type: EToastType.success,
          message: "Remove Product Success!",
        });
      } else {
        addToast({ type: EToastType.error, message: data as string });
      }
    },
    [id, fetchProducts, addToast],
  );

  const columns: ColumnDef<TProductTable>[] = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) =>
          `${row.original.name} - ${row.original.variants[0]?.variantName}`,
      },
      { header: "Description", accessorKey: "description" },
      {
        header: "Price",
        accessorKey: "variants",
        cell: ({ row }) => <PriceBox price={row.original.variants[0]?.price} />,
      },
      {
        header: "Stock",
        accessorKey: "",
        cell: ({ row }) => row.original.variants[0]?.stock,
      },
      {
        header: "Percent Off",
        accessorKey: "",
        cell: ({ row }) => row.original.variants[0]?.discountPercent,
      },
      { header: "Created At", accessorKey: "createdAt" },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <LinkAsButton
              href={genPath(EPath.adminProducts, row.original.id.toString())}
            >
              <Icon name={EIconName.enter} />
            </LinkAsButton>

            <Icon
              onClick={() => {
                removeCollProduct(row.original.id);
              }}
              className="cursor-pointer"
              name={EIconName.trash}
            />
          </div>
        ),
      },
    ],
    [removeCollProduct],
  );

  return (
    <Table key={JSON.stringify(products)} columns={columns} data={products} />
  );
};
