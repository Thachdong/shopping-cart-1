"use client";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { TagList } from "@/components/molecules/tag-list";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

type TBlogpostsTableProps = {
  blogposts: TBlogpost[];
};

export const BlogpostsTable: React.FC<Readonly<TBlogpostsTableProps>> = ({
  blogposts,
}) => {
  const columns: ColumnDef<TBlogpost>[] = useMemo(
    () => [
      { header: "Title", accessorKey: "title" },
      { header: "Description", accessorKey: "description" },
      { header: "Publish Date", accessorKey: "publishDate" },
      {
        header: "Related Products",
        accessorKey: "products",
        cell: ({ row }) => (
          <TagList
            tags={row.original.products.map((prd) => ({ content: prd.name }))}
          />
        ),
      },
      {
        header: "Related Collections",
        accessorKey: "collections",
        cell: ({ row }) => (
          <TagList
            tags={row.original.collections.map((coll) => ({
              content: coll.name,
            }))}
          />
        ),
      },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => (
          <LinkAsButton
            href={genPath(EPath.adminBlogposts, row.original.id.toString())}
          >
            <Icon name={EIconName.enter} />
          </LinkAsButton>
        ),
      },
    ],
    [],
  );

  return <Table columns={columns} data={blogposts} />;
};
