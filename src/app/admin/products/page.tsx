import { AdminProducts } from "@/components/pages/admin/products";
import { getProductsTable } from "@/services/product-services";

export default async function ProductsPage() {
  const products = await getProductsTable();

  return <AdminProducts products={products} />;
}
