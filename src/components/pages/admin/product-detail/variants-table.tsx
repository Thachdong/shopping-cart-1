"use client";
import { S3Image } from "@/components/atoms/s3-image";
import Table from "@/components/molecules/table";
import { TProductDetailVariant } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

type TVariantsTable = {
  variants: TProductDetailVariant[];
};

export const VariantsTable: React.FC<TVariantsTable> = ({ variants }) => {
  const cols: ColumnDef<TProductDetailVariant>[] = useMemo(
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
        header: "Price (VND)",
        accessorKey: "price",
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Percent Off (%)",
        accessorKey: "percentOff",
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
    ],
    [],
  );

  return <Table columns={cols} data={variants} />;
};
