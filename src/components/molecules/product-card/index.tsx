import { ECurrency, EPath } from "@/constants";
import React from "react";
import { CardThumbnails } from "../card-thumbnails";
import { Header } from "@/components/atoms/header";
import { joinClass } from "@/helpers/style";
import { SaleBox } from "../sale-box";
import { genPath } from "@/helpers/router";
import { TProductCardProps } from "@/types/product";
import Link from "next/link";

const DEFAULT_CLASSNAME = {
  card: "border rounded-lg hover:border-secondary-200",
  body: "flex flex-col gap-2 p-2",
};

export const ProductCard: React.FC<Readonly<TProductCardProps>> = ({
  product,
  className,
}) => {
  return (
    <Link
      href={genPath(EPath.products, product.id)}
      className={joinClass(className, DEFAULT_CLASSNAME.card)}
    >
      {/* thumbnails */}
      <CardThumbnails
        imageClassName="!rounded-lg"
        thumbnails={product.thumbnails}
      />

      {/* product infomation */}
      <div className={joinClass(DEFAULT_CLASSNAME.body)}>
        <Header className="truncate" level={6}>
          {product.name}
        </Header>

        <p className="truncate">{product.description}</p>

        <SaleBox price={0} sale={0} currency={ECurrency.VND} />
      </div>
    </Link>
  );
};
