"use client";
import { PriceBox } from "@/components/atoms/price-box";
import Table from "@/components/molecules/table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const OrderItemsTable: React.FC<TOrderItemsTableProps> = ({ items }) => {
  const columns: ColumnDef<TOrderItem>[] = [
    { header: "Product Name", accessorKey: "name" },
    { header: "Product Description", accessorKey: "description" },
    { header: "Quantity", accessorKey: "quantity" },
    { header: "Discount Percent (%)", accessorKey: "discountPercent" },
    {
      header: "Discount Price",
      accessorKey: "discountPrice",
      cell: ({ row }) => <PriceBox price={row.original.discountPrice} />,
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ row }) => <PriceBox price={row.original.total} />,
    },
  ];
  return <Table data={items} columns={columns} />;
};
