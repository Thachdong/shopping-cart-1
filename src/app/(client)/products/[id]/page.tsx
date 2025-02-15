import { ProductDetail } from "@/components/pages/product-detail";
import { bestProducts } from "../../data";

export default async function ProductDetailPage() {
  return <ProductDetail product={bestProducts[0]} />;
}
