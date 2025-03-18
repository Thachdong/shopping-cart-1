import { Header } from "@/components/atoms/header";
import { CardThumbnails } from "@/components/molecules/card-thumbnails";
import { SaleBox } from "@/components/molecules/sale-box";
import { Tab } from "@/components/molecules/tab";
import { ECurrency } from "@/constants";
import { TProductDetailPageProps } from "@/types/product";
import { AddToCartButton } from "./add-to-cart-button";

export const ProductDetail: React.FC<Readonly<TProductDetailPageProps>> = ({
  product,
}) => {
  const tabItems: TTabItem[] = [
    { id: "blog", label: "Detail", content: "blog content" },
    { id: "comments", label: "Comments", content: "Comment list" },
  ];
  return (
    <div className="py-4">
      <div className="grid grid-cols-2 gap-4 md:gap-2">
        {/* thumbnails */}
        <CardThumbnails thumbnails={product.thumbnails} />

        {/* product detail */}
        <div className="flex flex-col gap-4">
          <Header level={4}>{product.name}</Header>

          <p>{product.description}</p>

          <SaleBox
            price={product.price}
            sale={product.discountPrice}
            currency={ECurrency.VND}
          />

          <AddToCartButton product={product} />
        </div>
      </div>

      {/* tab: posts, comments */}
      <Tab items={tabItems} initTabId="blog" />
    </div>
  );
};
