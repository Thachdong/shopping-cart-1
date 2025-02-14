"use client";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

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

export const CollectionsTable: React.FC = () => {
  const columns: ColumnDef<TAdminCollection>[] = useMemo(
    () => [
      { header: "Name", accessorKey: "name" },
      { header: "Description", accessorKey: "description" },
      { header: "createdAt", accessorKey: "createdAt" },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => (
          <LinkAsButton
            href={genPath(EPath.adminCollections, row.original.id.toString())}
          >
            <Icon name={EIconName.enter} />
          </LinkAsButton>
        ),
      },
    ],
    [],
  );

  return <Table columns={columns} data={MOCK_COLLECTIONS} />;
};
