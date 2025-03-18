"use client";

import { Button } from "@/components/atoms/button";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import { EButtonType, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { useCart } from "@/libs/contexts/cart-context";
import { TProductCard } from "@/types/product";
import React, { useCallback, useMemo } from "react";

type TAddToCartButtonProps = {
  product: TProductCard;
};

export const AddToCartButton: React.FC<Readonly<TAddToCartButtonProps>> = ({
  product,
}) => {
  const { addProduct, products } = useCart();

  const isProductInCart = useMemo(() => {
    return products.findIndex((prd) => prd.id === product.id) !== -1;
  }, [products, product.id]);

  const handleAddProduct = useCallback(() => {
    const productToAdd: TProductInCart = {
      id: Number(product.id),
      name: product.name,
      price: product.price,
      discountPercent: product.discountPercent,
      discountPrice: product.discountPrice,
      quantity: 1,
      total: product.discountPrice,
    };

    addProduct(productToAdd);
  }, [addProduct, product]);

  if (isProductInCart) {
    return (
      <LinkAsButton
        href={genPath(EPath.cart)}
        buttonProps={{
          variant: EButtonType.primary,
        }}
      >
        Already In Cart
      </LinkAsButton>
    );
  }

  return (
    <Button onClick={handleAddProduct} variant={EButtonType.primary}>
      Add To Cart
    </Button>
  );
};
