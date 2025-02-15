"use client";
import { PriceBox } from "@/components/atoms/price-box";
import Table from "@/components/molecules/table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

export const ProductsCartTable: React.FC<TProductCartProps> = ({
  products,
}) => {
  const columns: ColumnDef<TProductInCart>[] = useMemo(
    () => [
      { header: "Product", accessorKey: "name" },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => <PriceBox price={row.original.price} />,
      },
      { header: "Discount Percent", accessorKey: "discountPercent" },
      {
        header: "Discount Price",
        accessorKey: "discountPrice",
        cell: ({ row }) => <PriceBox price={row.original.discountPrice} />,
      },
      { header: "Quantity", accessorKey: "quantity" },
      {
        header: "Total",
        accessorKey: "total",
        cell: ({ row }) => <PriceBox price={row.original.total} />,
      },
    ],
    [],
  );

  return <Table columns={columns} data={products} />;
};
