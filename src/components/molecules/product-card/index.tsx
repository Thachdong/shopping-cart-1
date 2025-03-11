"use client";
import { ECurrency, EPath } from "@/constants";
import React from "react";
import { Header } from "@/components/atoms/header";
import { joinClass } from "@/helpers/style";
import { SaleBox } from "../sale-box";
import { genPath } from "@/helpers/router";
import { TProductCardProps } from "@/types/product";
import Link from "next/link";

const DEFAULT_CLASSNAME = {
  card: "border border-gray-300 hover:border-secondary-200 hover:-translate-y-1 hover:shadow-xl transition duration-350",
  body: "flex flex-col gap-2 p-2",
};

export const ProductCard: React.FC<Readonly<TProductCardProps>> = ({
  product,
  className,
}) => {
  return (
    <div className={joinClass(className, DEFAULT_CLASSNAME.card)}>
      {/* thumbnails */}
      {/* <CardThumbnails thumbnails={product.thumbnails} /> */}

      {/* product infomation */}
      <Link
        href={genPath(EPath.products, product.id.toString())}
        className={joinClass(DEFAULT_CLASSNAME.body)}
      >
        <Header className="truncate" level={6}>
          {product.name}
        </Header>

        <p className="truncate">{product.description}</p>

        <SaleBox price={0} sale={0} currency={ECurrency.VND} />
      </Link>
    </div>
  );
};
