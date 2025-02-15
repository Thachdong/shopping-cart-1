"use client";
import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

export const ProductTable: React.FC<TAdminProductsPageProps> = ({
  products,
}) => {
  const columns: ColumnDef<TAdminProduct>[] = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Description", accessorKey: "description" },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => <PriceBox price={row.original.price} />,
      },
      { header: "Stock", accessorKey: "stock" },
      { header: "Percent Off", accessorKey: "percentOff" },
      { header: "Created At", accessorKey: "createAt" },
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
