import { Header } from "@/components/atoms/header";
import React from "react";
import { CartTable } from "@/components/organisms/cart-table";

export const Cart: React.FC = () => {
  return (
    <div>
      {/* Page title */}
      <Header className="my-4" level={1}>
        Cart
      </Header>

      {/* Products table */}
      <CartTable />
    </div>
  );
};
