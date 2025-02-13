"use client";
import { Header } from "@/components/atoms/header";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EButtonType, EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";

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

const columnHelper = createColumnHelper<TAdminCollection>();

export const Collections: React.FC = () => {
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
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Header level={1}>Collections</Header>
        <LinkAsButton
          buttonProps={{ variant: EButtonType.outline }}
          href={genPath(EPath.adminCollections, "create")}
        >
          Create
        </LinkAsButton>
      </div>

      {/* Collection table */}
      <Table
        columns={columns as ColumnDef<TAdminCollection>[]}
        data={MOCK_COLLECTIONS}
      />
    </>
  );
};
