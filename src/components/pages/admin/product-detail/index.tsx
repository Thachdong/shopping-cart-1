import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { TDetailTableRow } from "@/types/table";
import React from "react";
import { VariantsTable } from "./variants-table";

const MOCK_VARIANTS: TProductVariant[] = [];

for (let i = 1; i < 10; i++) {
  MOCK_VARIANTS.push({
    id: i,
    color: "Red",
    size: "XXL",
    price: 99,
    stock: 100,
    percentOff: 0,
    thumbnails: [],
  });
}

const MOCK_PRODUCT: TProductDetail = {
  id: 1,
  name: "Product name",
  description: "Product description",
  collectionIds: [],
  blogpostIds: [],
  variants: MOCK_VARIANTS,
  createdAt: "2025/02/14",
  updatedAt: "2025/02/14",
};

export const ProductDetail: React.FC = () => {
  const rows: TDetailTableRow[] = [
    {
      id: "name",
      header: "Name",
      content: MOCK_PRODUCT.name,
    },
    {
      id: "description",
      header: "Description",
      content: MOCK_PRODUCT.description,
    },
    {
      id: "createdAt",
      header: "Created At",
      content: MOCK_PRODUCT.createdAt,
    },
    {
      id: "updatedAt",
      header: "Updated At",
      content: MOCK_PRODUCT.updatedAt,
    },
    {
      id: "collectionIds",
      header: "Related Collections",
      content: MOCK_PRODUCT.collectionIds,
    },
    {
      id: "blogpostIds",
      header: "Related Posts",
      content: MOCK_PRODUCT.blogpostIds,
    },
  ];

  return (
    <>
      <Header level={1}>Product Detail</Header>

      <Header level={4}>I. General</Header>

      <DetailTable rows={rows} headerClassName="!w-44" />

      <Header level={4}>II. Variants</Header>

      <VariantsTable variants={MOCK_VARIANTS} />
    </>
  );
};
