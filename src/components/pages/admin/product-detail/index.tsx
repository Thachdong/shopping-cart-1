import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { TDetailTableRow } from "@/types/table";
import React from "react";
import { VariantsTable } from "./variants-table";
import { TProductDetail } from "@/types/product";
import { TagList } from "@/components/molecules/tag-list";
import { EditGeneralButton } from "./edit-general-button";
import { AddVariantButton } from "./add-variant-button";

type TProductDetailProps = {
  product: TProductDetail | null;
};

export const ProductDetail: React.FC<Readonly<TProductDetailProps>> = ({
  product,
}) => {
  const rows: TDetailTableRow[] = [
    {
      id: "name",
      header: "Name",
      content: product?.name,
    },
    {
      id: "description",
      header: "Description",
      content: product?.description,
    },
    {
      id: "createdAt",
      header: "Created At",
      content: product?.createdAt,
    },
    {
      id: "updatedAt",
      header: "Updated At",
      content: product?.updatedAt,
    },
    {
      id: "collectionIds",
      header: "Related Collections",
      content: (
        <TagList
          tags={
            product?.collections.map((coll) => ({ content: coll.name })) || []
          }
        />
      ),
    },
    {
      id: "blogpostIds",
      header: "Related Posts",
      content: (
        <TagList
          tags={
            product?.blogposts.map((post) => ({ content: post.title })) || []
          }
        />
      ),
    },
  ];

  return (
    <>
      <Header level={1}>Product Detail</Header>

      {/* General data */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          I. General
        </Header>
        <EditGeneralButton
          generalData={{
            name: product?.name || "",
            description: product?.description || "",
            collectionIds: product?.collections.map((coll) => coll.id) || [],
            blogpostIds: product?.blogposts.map((post) => post.id) || [],
          }}
        />
      </div>

      <DetailTable rows={rows} headerClassName="!w-44" />

      {/* Product variants */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          II. Variants
        </Header>
        <AddVariantButton />
      </div>

      <VariantsTable variants={product?.variants || []} />
    </>
  );
};
