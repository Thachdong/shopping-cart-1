import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { CardThumbnails } from "@/components/molecules/card-thumbnails";
import { SaleBox } from "@/components/molecules/sale-box";
import { Tab } from "@/components/molecules/tab";
import { EButtonType, ECurrency } from "@/constants";
import { TProductDetailPageProps } from "@/types/product";

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

          <Button variant={EButtonType.primary}>ADD TO CART</Button>
        </div>
      </div>

      {/* tab: posts, comments */}
      <Tab items={tabItems} initTabId="blog" />
    </div>
  );
};
