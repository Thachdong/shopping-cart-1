import { EButtonType, ECurrency, EPath } from "@/constants";
import React from "react";
import { CardThumbnails } from "../card-thumbnails";
import { Header } from "@/components/atoms/header";
import { joinClass } from "@/helpers/style";
import { LinkAsButton } from "../link-as-button";
import { SaleBox } from "../sale-box";
import { genPath } from "@/helpers/router";

const DEFAULT_CLASSNAME = {
  card: "border rounded-lg",
  body: "flex flex-col gap-2 p-2",
  description: "",
  footer: "flex items-center justify-between p-2",
};

export const ProductCard: React.FC<Readonly<TProductCardProps>> = ({
  product,
  className,
}) => {
  return (
    <div className={joinClass(className, DEFAULT_CLASSNAME.card)}>
      {/* thumbnails */}
      <CardThumbnails thumbnails={product.thumbnails} />

      {/* product infomation */}
      <div className={joinClass(DEFAULT_CLASSNAME.body)}>
        <Header className="truncate" level={6}>
          {product.name}
        </Header>
        <p className="truncate">{product.description}</p>
        <SaleBox price={0} sale={0} currency={ECurrency.VND} />
      </div>

      {/* call to action buttons */}
      <div className={DEFAULT_CLASSNAME.footer}>
        <LinkAsButton
          href={genPath(EPath.products, product.id)}
          buttonProps={{ variant: EButtonType.secondary }}
        >
          DETAIL
        </LinkAsButton>

        <LinkAsButton
          href={genPath(EPath.cart)}
          buttonProps={{ variant: EButtonType.primary }}
        >
          ADD TO CART
        </LinkAsButton>
      </div>
    </div>
  );
};
