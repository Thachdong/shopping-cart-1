import { bestProducts } from "../data";
import { ProductListPage } from "@/components/pages/product-list";

export default async function ProductsPage() {
  return <ProductListPage products={bestProducts} />;
}
