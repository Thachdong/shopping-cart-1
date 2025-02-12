"use client";
import { PriceBox } from "@/components/atoms/price-box";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { joinClass } from "@/helpers/style";
import Link from "next/link";
import React, { useMemo } from "react";
import styles from "@/components/molecules/table/table.module.scss";

const productsInCart: TProductInCart[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
  },
  {
    id: 3,
    name: "Black Leather Jacket",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
  },
  {
    id: 4,
    name: "Red Summer Dress",
    price: 100000,
    discountPercent: 10,
    discountPrice: 90000,
    quantity: 10,
  },
];

export const OrderTable: React.FC = () => {
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

        <td>{prd.quantity}</td>

        <td>
          <PriceBox price={0} />
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
        </tr>
      </thead>

      <tbody>
        {tableContent}

        <tr className="!border-0">
          <td className="!border-0" colSpan={3}></td>
          <td className="font-bold">Total Discount</td>
          <td colSpan={2}>
            <PriceBox price={0} />
          </td>
        </tr>

        <tr className="!border-0">
          <td className="!border-0" colSpan={3}></td>
          <td className="font-bold">Total Before Discount</td>
          <td colSpan={2}>
            <PriceBox price={0} />
          </td>
        </tr>

        <tr className="!border-0">
          <td className="!border-0" colSpan={3}></td>
          <td className="font-bold">Total</td>
          <td colSpan={2}>
            <PriceBox price={0} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
