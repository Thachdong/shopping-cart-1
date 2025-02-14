"use client";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const MOCK_BLOGPOSTS: TBlogpost[] = [
  {
    id: 1,
    title: "Blogposts title",
    description: "Blogpost description",
    publishDate: "2025/02/13",
    relatedCollections: [],
    relatedProducts: [],
  },
  {
    id: 2,
    title: "Blogposts title",
    description: "Blogpost description",
    publishDate: "2025/02/13",
    relatedCollections: [],
    relatedProducts: [],
  },
  {
    id: 3,
    title: "Blogposts title",
    description: "Blogpost description",
    publishDate: "2025/02/13",
    relatedCollections: [],
    relatedProducts: [],
  },
  {
    id: 4,
    title: "Blogposts title",
    description: "Blogpost description",
    publishDate: "2025/02/13",
    relatedCollections: [],
    relatedProducts: [],
  },
  {
    id: 5,
    title: "Blogposts title",
    description: "Blogpost description",
    publishDate: "2025/02/13",
    relatedCollections: [],
    relatedProducts: [],
  },
];

export const BlogpostsTable: React.FC = () => {
  const columns: ColumnDef<TBlogpost>[] = useMemo(
    () => [
      { header: "Title", accessorKey: "title" },
      { header: "Description", accessorKey: "description" },
      { header: "Publish Date", accessorKey: "publishDate" },
      { header: "Related Products", accessorKey: "relatedProducts" },
      { header: "Related Collections", accessorKey: "relatedCollections" },
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

  return <Table columns={columns} data={MOCK_BLOGPOSTS} />;
};
