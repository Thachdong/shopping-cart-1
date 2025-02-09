import { Button } from "@/components/atoms/button";
import { HeaderWithButton } from "@/components/molecules/header-with-button";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import { ProductCard } from "@/components/molecules/product-card";
import { EButtonType } from "@/constants";
import { joinClass } from "@/helpers/style";
import React from "react";

const CONTAINER_CLASSNAME = "flex flex-col gap-y-2 P-4";

const LIST_CLASSNAME =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

const BUTTON_CLASSNAME = "self-center";

export const ProductList: React.FC<Readonly<TProductList>> = ({
  title,
  className,
  listClassName,
  products,
  loadMoreAction,
}) => {
  return (
    <div className={joinClass(CONTAINER_CLASSNAME, className)}>
      <HeaderWithButton
        level={3}
        button={
          <LinkAsButton
            buttonProps={{ variant: EButtonType.outline }}
            href={"/"}
          >
            View all
          </LinkAsButton>
        }
      >
        {title}
      </HeaderWithButton>

      <div className={joinClass(LIST_CLASSNAME, listClassName)}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Button
        className={BUTTON_CLASSNAME}
        variant={EButtonType.outline}
        onClick={loadMoreAction}
      >
        Load more
      </Button>
    </div>
  );
};
