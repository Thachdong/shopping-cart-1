import { ProductList } from "@/components/organisms/product-list";
import { bestProducts } from "../data";

export default async function ProductsPage() {
  return (
    <div className="p-2">
      <ProductList title="" products={bestProducts} />
    </div>
  );
}
