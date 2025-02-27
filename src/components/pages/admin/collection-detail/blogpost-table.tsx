"use client";
import { Icon } from "@/components/atoms/icon";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import Table from "@/components/molecules/table";
import { TagList } from "@/components/molecules/tag-list";
import { EIconName, EPath, EToastType } from "@/constants";
import { genPath } from "@/helpers/router";
import { useToast } from "@/libs/contexts/toast-context";
import { removeCollPostAction } from "@/server-actions/collection";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type TBlogpostsTableProps = {
  posts: TBlogpost[];
  fetchPosts: () => void;
};

export const BlogpostsTable: React.FC<Readonly<TBlogpostsTableProps>> = ({
  posts,
  fetchPosts,
}) => {
  const { addToast } = useToast();
  const { id } = useParams();

  const removeCollPost = useCallback(
    async (postId: number) => {
      const { success, data } = await removeCollPostAction(Number(id), postId);

      if (success) {
        await fetchPosts();

        addToast({
          type: EToastType.success,
          message: "Remove Post Success!",
        });
      } else {
        addToast({ type: EToastType.error, message: data as string });
      }
    },
    [id, fetchPosts, addToast],
  );

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
          <div className="flex gap-2 items-center">
            <LinkAsButton
              href={genPath(EPath.adminBlogposts, row.original.id.toString())}
            >
              <Icon name={EIconName.enter} />
            </LinkAsButton>
            <Icon
              onClick={() => {
                removeCollPost(row.original.id);
              }}
              className="cursor-pointer"
              name={EIconName.trash}
            />
          </div>
        ),
      },
    ],
    [removeCollPost],
  );

  return <Table key={posts.length} columns={columns} data={posts} />;
};
