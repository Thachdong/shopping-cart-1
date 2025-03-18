"use client";
import { Icon } from "@/components/atoms/icon";
import { EIconName, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import { useCart } from "@/libs/contexts/cart-context";
import Link from "next/link";

const CLASS_NAMES = {
  link: "relative mr-2",
  cartCount:
    "absolute top-0 right-0 translate-x-1/2 -translate-y-1/4 flex items-center justify-center font-bold text-white text-xs w-5 h-5 rounded-full bg-secondary-100",
};

export const CartButton: React.FC = () => {
  const { count } = useCart();
  return (
    <Link className={CLASS_NAMES.link} href={genPath(EPath.cart)}>
      <Icon name={EIconName.cart} />
      {count > 0 && <div className={CLASS_NAMES.cartCount}>{count}</div>}
    </Link>
  );
};
