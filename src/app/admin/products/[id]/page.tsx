import { ProductDetail } from "@/components/pages/admin/product-detail";
import { getProductDetailService } from "@/services/product-services";

type TProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: TProductDetailPageProps) {
  const productId = (await params).id;

  const productDetail = await getProductDetailService(Number(productId));

  return <ProductDetail product={productDetail} />;
}
