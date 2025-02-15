import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { PriceBox } from "@/components/atoms/price-box";
import { DetailTable } from "@/components/molecules/detail-table";
import { EButtonType } from "@/constants";
import { TDetailTableRow } from "@/types/table";
import React from "react";
import { OrderItemsTable } from "./order-items-table";

const order: TOrderDetail = {
  id: 1,
  createdAt: new Date().toISOString(),
  username: "username",
  userId: 1,
  shippingAddress: "1234 Street, City, Country",
  paymentMethod: "Credit Card",
  isComplete: false,
  completeDate: "",
  phoneNumber: "123-456-789",
  discount: 0,
  shippingFee: 5,
  shippingVender: "UPS",
  total: 100,
  items: [
    {
      id: 1,
      name: "product name 1",
      description: "description 1",
      quantity: 1,
      discountPercent: 0,
      discountPrice: 0,
      total: 10,
    },
    {
      id: 2,
      name: "product name 2",
      description: "description 2",
      quantity: 2,
      discountPercent: 0,
      discountPrice: 0,
      total: 40,
    },
    {
      id: 3,
      name: "product name 3",
      description: "description 3",
      quantity: 3,
      discountPercent: 0,
      discountPrice: 0,
      total: 90,
    },
    {
      id: 4,
      name: "product name 4",
      description: "description 4",
      quantity: 4,
      discountPercent: 0,
      discountPrice: 0,
      total: 160,
    },
  ],
};

export const OrderDetail: React.FC = () => {
  const rows: TDetailTableRow[] = [
    { id: "1", header: "Owner", content: order.username },
    {
      id: "2",
      header: "Status",
      content: (
        <div>
          <b>Is complete:</b>
          {order.isComplete ? order.isComplete : "Not complete yet;    "}
          <b>Complete date:</b>{" "}
          {order.completeDate ? order.completeDate : "Not complete yet"}
        </div>
      ),
    },
    {
      id: "3",
      header: "Shipping Address",
      content: (
        <div>
          {order.shippingAddress} --- {order.shippingVender} ---
          <PriceBox price={order.shippingFee} />
        </div>
      ),
    },
    { id: "4", header: "Payment Method", content: order.paymentMethod },
    {
      id: "5",
      header: "Total",
      content: <PriceBox price={order.shippingFee} />,
    },
  ];
  return (
    <>
      <Header level={1}>Order Detail</Header>

      {/* 
        - Owner
        - Status
        - Shipping address
        - Payment method
        - Price
      */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          I. Order Overview
        </Header>
        <Button variant={EButtonType.outline}>Edit</Button>
      </div>
      <DetailTable rows={rows} />

      {/* Order items */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          II. Order Items
        </Header>
        <Button variant={EButtonType.outline}>Add Item</Button>
      </div>

      <OrderItemsTable items={order.items} />
    </>
  );
};
