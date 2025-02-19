"use client";
import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { TProductTable } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

type TProductTableProps = {
  products: TProductTable[];
};

export const ProductTable: React.FC<TProductTableProps> = ({ products }) => {
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
        cell: ({ row }) => row.original.variants[0]?.percentOff,
      },
      { header: "Created At", accessorKey: "createdAt" },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => (
          <LinkAsButton
            href={genPath(EPath.adminProducts, row.original.id.toString())}
          >
            <Icon name={EIconName.enter} />
          </LinkAsButton>
        ),
      },
    ],
    [],
  );

  return <Table columns={columns} data={products} />;
};
