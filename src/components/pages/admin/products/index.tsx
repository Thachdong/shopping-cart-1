import { AdminPageHeader } from "@/components/molecules/admin-page-header";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { ProductTable } from "./products-table";
import { TProductTable } from "@/types/product";

type TAdminProductsProps = {
  products: TProductTable[];
};

export const AdminProducts: React.FC<TAdminProductsProps> = ({ products }) => {
  return (
    <>
      <AdminPageHeader
        header="Products"
        pathName={genPath(EPath.adminProducts, "create")}
      />

      <ProductTable products={products} />
    </>
  );
};
