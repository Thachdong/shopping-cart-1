import { AdminPageHeader } from "@/components/molecules/admin-page-header";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { OrdersTable } from "./orders-table";

const MOCK_ORDERS: TOrder[] = [];
const MOCK_PRODUCTS = [
  { id: 1, name: "product name 1 " },
  { id: 2, name: "product name 2 " },
  { id: 3, name: "product name 3 " },
  { id: 4, name: "product name 4 " },
];

for (let i = 1; i < 15; i++) {
  MOCK_ORDERS.push({
    id: i,
    createdAt: new Date().toISOString(),
    username: `user${i}`,
    userId: i,
    shippingAddress: `1234 Street ${i}, City, Country`,
    paymentMethod: "Credit Card",
    isComplete: i % 2 === 0,
    completeDate: i % 2 === 0 ? new Date().toISOString() : "",
    phoneNumber: `123-456-789${i}`,
    discount: 0,
    shippingFee: 5,
    shippingVender: "UPS",
    total: 100 + i * 10,
    products: MOCK_PRODUCTS,
  });
}

export const Orders: React.FC = () => {
  return (
    <>
      <AdminPageHeader
        header="Orders"
        pathName={genPath(EPath.adminOrders, "create")}
      />

      <OrdersTable orders={MOCK_ORDERS} />
    </>
  );
};
