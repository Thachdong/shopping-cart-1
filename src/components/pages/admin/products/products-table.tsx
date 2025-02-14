"use client";
import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";

const columnHelper = createColumnHelper<TAdminProduct>();

export const ProductTable: React.FC<TAdminProductsPageProps> = ({
  products,
}) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", { header: "Name" }),
      columnHelper.accessor("description", { header: "Description" }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: ({ row }) => <PriceBox price={row.original.price} />,
      }),
      columnHelper.accessor("stock", { header: "Stock" }),
      columnHelper.accessor("percentOff", { header: "Percent Off" }),
      columnHelper.accessor("createAt", { header: "Created At" }),
      columnHelper.accessor("id", {
        header: "",
        cell: ({ row }) => (
          <LinkAsButton
            href={genPath(EPath.adminProducts, row.original.id.toString())}
          >
            <Icon name={EIconName.enter} />
          </LinkAsButton>
        ),
      }),
    ],
    [],
  );

  return (
    <Table columns={columns as ColumnDef<TAdminProduct>[]} data={products} />
  );
};
