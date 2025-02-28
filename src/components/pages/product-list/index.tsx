import { Header } from "@/components/atoms/header";
import { FilterBox } from "@/components/organisms/filter-box";
import { ProductList } from "@/components/organisms/product-list";
import { SearchAndSortBox } from "@/components/organisms/search-and-sort-box";
import { TProductListPageProps } from "@/types/product";
import React from "react";

export const ProductListPage: React.FC<Readonly<TProductListPageProps>> = ({
  products,
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <FilterBox />

      <div className="grid grid-rows-[auto_auto_1fr]">
        <Header className="mt-4 px-2" level={1}>
          Products List
        </Header>

        <SearchAndSortBox />

        <div className="p-2">
          <ProductList title="" products={products} />
        </div>
      </div>
    </div>
  );
};
