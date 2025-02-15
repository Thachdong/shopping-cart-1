"use client";
import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { TagList } from "@/components/molecules/tag-list";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo } from "react";

type TProducts = TOrder["products"];

export const OrdersTable: React.FC<OrderTableProps> = ({ orders }) => {
  const renderProductTags = useCallback((products: TProducts) => {
    const tags = products.map((pr) => ({
      content: pr.name,
      className: "text-center",
    }));

    return <TagList tags={tags} className="grid grid-cols-2 gap-2" />;
  }, []);

  const columns: ColumnDef<TOrder>[] = useMemo(
    () => [
      { header: "Created At", accessorKey: "createdAt" },
      { header: "Owner", accessorKey: "username" },
      { header: "Is Complete", accessorKey: "isComplete" },
      { header: "Complete Date", accessorKey: "completeDate" },
      { header: "Discount", accessorKey: "discount" },
      {
        header: "Shipping Fee",
        accessorKey: "shippingFee",
        cell: ({ row }) => <PriceBox price={row.original.shippingFee} />,
      },
      { header: "Shipping Vender", accessorKey: "shippingVender" },
      {
        header: "Total",
        accessorKey: "total",
        cell: ({ row }) => <PriceBox price={row.original.total} />,
      },
      {
        header: "Products",
        accessorKey: "",
        cell: ({ row }) => renderProductTags(row.original.products),
      },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => (
          <LinkAsButton
            href={genPath(EPath.adminOrders, row.original.id.toString())}
          >
            <Icon name={EIconName.enter} />
          </LinkAsButton>
        ),
      },
    ],
    [],
  );

  return <Table data={orders} columns={columns} />;
};
