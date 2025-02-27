import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { TagList } from "@/components/molecules/tag-list";
import { TDetailTableRow } from "@/types/table";
import React from "react";
import { EditGeneralButton } from "./edit-general-button";
import { EditBlogpostButton } from "./edit-blopost-button";
import { BaseEditor } from "@/components/molecules/form-tags/base-editor";

type TBlogpostDetailProps = {
  blogpost: TBlogpostDetail | null;
};

export const BlogpostDetail: React.FC<Readonly<TBlogpostDetailProps>> = ({
  blogpost,
}) => {
  const rows: TDetailTableRow[] = [
    { id: "1", header: "Title", content: blogpost?.title },
    { id: "2", header: "Description", content: blogpost?.description },
    { id: "3", header: "Publish Date", content: blogpost?.publishDate },
    {
      id: "4",
      header: "Related Products",
      content: (
        <TagList
          tags={blogpost?.products?.map((prd) => ({ content: prd.name })) || []}
        />
      ),
    },
    {
      id: "5",
      header: "Related Collections",
      content: (
        <TagList
          tags={
            blogpost?.collections?.map((coll) => ({ content: coll.name })) || []
          }
        />
      ),
    },
  ];
  return (
    <>
      <Header level={1}>Blogpost Detail</Header>

      {/* Infomations */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          I. Generals
        </Header>
        <EditGeneralButton
          defaultData={{
            title: blogpost?.title || "",
            description: blogpost?.description || "",
            publishDate: blogpost?.publishDate || "",
            productIds: blogpost?.products?.map((prd) => prd.id) || [],
            collectionIds: blogpost?.collections?.map((coll) => coll.id) || [],
          }}
        />
      </div>

      <DetailTable rows={rows} headerClassName="w-1/4" />

      {/* Infomations */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          II. Blogpost Content
        </Header>
        <EditBlogpostButton defaultData={{ post: blogpost?.post || "" }} />
      </div>

      <BaseEditor value={blogpost?.post} disabled={true} />
    </>
  );
};
