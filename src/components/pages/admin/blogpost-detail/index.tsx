import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { EButtonType } from "@/constants";
import { TDetailTableRow } from "@/types/table";
import React from "react";

const MOCK_BLOGPOSTS: TBlogpostDetail = {
  id: 1,
  title: "Blogpost title",
  description: "Blogpost description",
  content: "Blogpost content",
  publishDate: "2025/02/14",
  products: [],
  collections: [],
};

export const BlogpostDetail: React.FC = () => {
  const rows: TDetailTableRow[] = [
    { id: "1", header: "Title", content: MOCK_BLOGPOSTS.title },
    { id: "2", header: "Description", content: MOCK_BLOGPOSTS.description },
    { id: "3", header: "Publish Date", content: MOCK_BLOGPOSTS.publishDate },
    {
      id: "4",
      header: "Related Products",
      content: MOCK_BLOGPOSTS.products.toString(),
    },
    {
      id: "5",
      header: "Related Collections",
      content: MOCK_BLOGPOSTS.collections.toString(),
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

      {MOCK_BLOGPOSTS.content}
    </>
  );
};
