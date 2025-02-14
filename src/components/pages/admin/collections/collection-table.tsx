"use client";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

const columnHelper = createColumnHelper<TAdminCollection>();

const MOCK_COLLECTIONS: TAdminCollection[] = [
  {
    id: 1,
    name: "Best seller",
    description: "Best sell products",
    createdAt: "2025/02/13",
  },
  {
    id: 2,
    name: "Best seller",
    description: "Best sell products",
    createdAt: "2025/02/13",
  },
  {
    id: 3,
    name: "Best seller",
    description: "Best sell products",
    createdAt: "2025/02/13",
  },
  {
    id: 4,
    name: "Best seller",
    description: "Best sell products",
    createdAt: "2025/02/13",
  },
  {
    id: 5,
    name: "Best seller",
    description: "Best sell products",
    createdAt: "2025/02/13",
  },
];

export const CollectionTable: React.FC = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", { header: "Name" }),
      columnHelper.accessor("description", { header: "Description" }),
      columnHelper.accessor("createdAt", { header: "Created At" }),
      columnHelper.accessor("id", {
        header: "Detail",
        cell: ({ row }) => (
          <LinkAsButton
            href={genPath(EPath.adminCollections, row.original.id.toString())}
          >
            <Icon name={EIconName.enter} />
          </LinkAsButton>
        ),
      }),
    ],
    [],
  );

  return (
    <Table
      columns={columns as ColumnDef<TAdminCollection>[]}
      data={MOCK_COLLECTIONS}
    />
  );
};
