"use client";
import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { QuantityBox } from "@/components/molecules/quantity-box";
import { EButtonType, EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { joinClass } from "@/helpers/style";
import Link from "next/link";
import React, { useMemo } from "react";
import styles from "@/components/molecules/table/table.module.scss";
import { LinkAsButton } from "@/components/molecules/link-as-button";

const productsInCart: TProductInCart[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
    total: 900000,
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
    total: 900000,
  },
  {
    id: 3,
    name: "Black Leather Jacket",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
    total: 900000,
  },
  {
    id: 4,
    name: "Red Summer Dress",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
    total: 900000,
  },
];

export const CartTable: React.FC = () => {
  const tableContent = useMemo(() => {
    return productsInCart.map((prd) => (
      <tr key={prd.id}>
        <td>
          <Link href={genPath(EPath.products, prd.id.toString())}>
            {prd.name}
          </Link>
        </td>

        <td>
          <PriceBox price={prd.price} />
        </td>

        <td>{prd.discountPercent}%</td>

        <td>
          <PriceBox price={prd.discountPrice} />
        </td>

        <td>
          <div className="flex justify-center">
            <QuantityBox
              quantity={prd.quantity}
              increaseQuantity={() => {}}
              decreaseQuantity={() => {}}
            />
          </div>
        </td>

        <td>
          <PriceBox price={0} />
        </td>

        <td>
          <Icon
            name={EIconName.trash}
            className="text-red-500 mx-auto cursor-pointer"
          />
        </td>
      </tr>
    ));
  }, []);

  return (
    <table className={joinClass(styles["table-border"], "w-full")}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Discount Percents</th>
          <th>Discount Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {tableContent}

        <tr className="!border-0">
          <td className="!border-0" colSpan={3}></td>
          <td className="font-bold">Total Discount</td>
          <td colSpan={3}>
            <PriceBox price={0} />
          </td>
        </tr>

        <tr className="!border-0">
          <td className="!border-0" colSpan={3}></td>
          <td className="font-bold">Total Before Discount</td>
          <td colSpan={3}>
            <PriceBox price={0} />
          </td>
        </tr>

        <tr className="!border-0">
          <td className="!border-0" colSpan={3}></td>
          <td className="font-bold">Total</td>
          <td colSpan={3}>
            <PriceBox price={0} />
          </td>
        </tr>

        <tr className="!border-0">
          <td className="!border-0" colSpan={4}></td>
          <td className="!border-0 text-center" colSpan={3}>
            <LinkAsButton
              href={genPath(EPath.checkout)}
              buttonProps={{
                className: "!px-16 !h-12",
                variant: EButtonType.secondary,
              }}
            >
              Checkout
            </LinkAsButton>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
