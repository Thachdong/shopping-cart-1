import { Header } from "@/components/atoms/header";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import { ProductCard } from "@/components/molecules/product-card";
import { Slider } from "@/components/molecules/slider";
import { EButtonType } from "@/constants";
import { TProductCard } from "@/types/product";
import { ISlider } from "@/types/slider";
import React from "react";

const HEADER_CLASSNAME = "flex justify-between items-center";

export const ProductSlider: React.FC<Readonly<ISlider<TProductCard>>> = ({
  items,
  title,
  detailLink,
}) => {
  const productCards = items.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <div>
      <div className={HEADER_CLASSNAME}>
        <Header level={3}>{title}</Header>
        <LinkAsButton
          href={detailLink}
          buttonProps={{
            variant: EButtonType.outline,
          }}
        >
          Detail
        </LinkAsButton>
      </div>

      <Slider items={productCards} />
    </div>
  );
};
