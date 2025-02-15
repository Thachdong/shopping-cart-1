"use client";
import Table from "@/components/molecules/table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

type TVariantsTable = {
  variants: TProductVariant[];
};

export const VariantsTable: React.FC<TVariantsTable> = ({ variants }) => {
  const cols: ColumnDef<TProductVariant>[] = useMemo(
    () => [
      {
        header: "color",
        accessorKey: "color",
      },
      {
        header: "Size",
        accessorKey: "size",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Percent Off",
        accessorKey: "percentOff",
      },
      {
        header: "Thumnails",
        accessorKey: "thumbnails",
      },
    ],
    [],
  );

  return <Table columns={cols} data={variants} />;
};
