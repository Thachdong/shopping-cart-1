"use client";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { TAdminCollection } from "@/types/collections";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type TCollectionsTableProps = {
  collections: TAdminCollection[];
};

export const CollectionsTable: React.FC<TCollectionsTableProps> = ({
  collections,
}) => {
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

  return <Table columns={columns} data={collections} />;
};
