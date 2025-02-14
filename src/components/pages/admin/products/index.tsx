import { AdminPageHeader } from "@/components/molecules/admin-page-header";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { ProductTable } from "./products-table";

const MOCK_PRODUCTS: TAdminProduct[] = [];

for (let i = 0; i < 15; i++) {
  MOCK_PRODUCTS.push({
    id: i,
    name: "Product name " + i,
    description: "Product description " + i,
    price: 99,
    stock: 99,
    percentOff: 0,
    createAt: "2025/02/1" + i,
  });
}

export const AdminProducts: React.FC = () => {
  return (
    <>
      <AdminPageHeader
        header="Products"
        pathName={genPath(EPath.adminProducts, "create")}
      />

      <ProductTable products={MOCK_PRODUCTS} />
    </>
  );
};
