import { Button } from "@/components/atoms/button";
import { EButtonType } from "@/constants";
import React from "react";
import { CardThumbnails } from "../card-thumbnails";
import { Header } from "@/components/atoms/header";
import { joinClass } from "@/helpers/style";

const DEFAULT_CLASSNAME = {
  card: "border rounded-lg",
  body: "flex flex-col gap-2 p-2",
  description: "",
  footer: "flex items-center justify-between p-2",
};

export const ProductCard: React.FC<Readonly<TProductCard>> = ({
  product,
  className,
}) => {
  return (
    <div className={joinClass(className, DEFAULT_CLASSNAME.card)}>
      {/* thumbnails */}
      <CardThumbnails thumbnails={product.thumbnails} />

      {/* product infomation */}
      <div className={joinClass(DEFAULT_CLASSNAME.body)}>
        <Header level={6}>{product.name}</Header>
        <p>{product.description}</p>
      </div>

      {/* call to action buttons */}
      <div className={DEFAULT_CLASSNAME.footer}>
        <Button variant={EButtonType.secondary}>DETAIL</Button>
        <Button variant={EButtonType.primary}>ADD TO CART</Button>
      </div>
    </div>
  );
};
