"use client";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

export const UsersTable: React.FC<TUsersTableProps> = ({ users }) => {
  const columns: ColumnDef<TUser>[] = useMemo(
    () => [
      { header: "Username", accessorKey: "username" },
      { header: "Created At", accessorKey: "createdAt" },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
        cell: ({ row }) => (
          <a href={`tel:${row.original.phoneNumber}`}>
            {row.original.phoneNumber}
          </a>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: ({ row }) => (
          <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
        ),
      },
      { header: "Birthday", accessorKey: "birthday" },
      { header: "Address", accessorKey: "address" },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => (
          <LinkAsButton
            href={genPath(EPath.adminUsers, row.original.id.toString())}
          >
            <Icon name={EIconName.enter} />
          </LinkAsButton>
        ),
      },
    ],
    [],
  );
  return <Table data={users} columns={columns} />;
};
