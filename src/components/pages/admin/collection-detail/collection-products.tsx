"use client";
import { Header } from "@/components/atoms/header";
import React, { useCallback, useEffect, useState } from "react";
import { AddProductButton } from "./add-product-button";
import { ProductTable } from "./product-table";
import { TProductTable } from "@/types/product";
import { useParams } from "next/navigation";
import { getProductsByCollIdAction } from "@/server-actions/collection";

export const CollectionProducts: React.FC = () => {
  const [products, setProducts] = useState<TProductTable[]>([]);
  const { id } = useParams();

  const fetchProducts = useCallback(async () => {
    if (!id || Number.isNaN(Number(id))) return;

    const { success, data } = await getProductsByCollIdAction(Number(id));

    if (success && Array.isArray(data)) {
      setProducts([...data]);
    }
  }, [id]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          II. Products
        </Header>
        <AddProductButton
          productIds={products.map((prd) => prd.id)}
          fetchProducts={fetchProducts}
        />
      </div>

      <ProductTable products={products} fetchProducts={fetchProducts} />
    </>
  );
};
