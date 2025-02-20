import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { TagList } from "@/components/molecules/tag-list";
import { EButtonType } from "@/constants";
import { TDetailTableRow } from "@/types/table";
import React from "react";

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
        <Button variant={EButtonType.outline}>Edit</Button>
      </div>

      <DetailTable rows={rows} headerClassName="w-1/4" />

      {/* Infomations */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          II. Blogpost Content
        </Header>
        <Button variant={EButtonType.outline}>Edit</Button>
      </div>

      {blogpost?.post}
    </>
  );
};
