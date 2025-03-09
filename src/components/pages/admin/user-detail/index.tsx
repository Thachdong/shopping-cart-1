import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { EButtonType } from "@/constants";
import { TDetailTableRow } from "@/types/table";
import { OrdersTable } from "../orders/orders-table";
import { ProductsCartTable } from "./products-cart-table";
import Image from "next/image";

const MOCK_ORDERS: TOrder[] = [];
const MOCK_PRODUCT_IN_CART: TProductInCart[] = [];

const MOCK_PRODUCTS = [
  { id: 1, name: "product name 1 " },
  { id: 2, name: "product name 2 " },
  { id: 3, name: "product name 3 " },
  { id: 4, name: "product name 4 " },
];

for (let i = 1; i < 5; i++) {
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
    items: MOCK_PRODUCTS,
  });

  MOCK_PRODUCT_IN_CART.push({
    id: i,
    name: `Product ${i}`,
    price: 99,
    discountPercent: 0,
    discountPrice: 99,
    quantity: 1,
    total: 99,
  });
}

const MOCK_USER = {
  avatar: "",
  username: "Dongt",
  phoneNumber: "0353.860.797",
  email: "dongt@gmail.com",
  birthday: "27/02/1993",
  addresses: ["address 1", "address 2", "address 3"],
};

export const UserDetail: React.FC = () => {
  const rows: TDetailTableRow[] = [
    {
      id: "0",
      header: "Avatar",
      content: MOCK_USER.avatar ? (
        <Image
          src={MOCK_USER.avatar}
          width={75}
          height={75}
          alt={MOCK_USER.username}
        />
      ) : (
        ""
      ),
    },
    { id: "1", header: "Username", content: MOCK_USER.username },
    { id: "2", header: "Phone Number", content: MOCK_USER.phoneNumber },
    { id: "3", header: "Email", content: MOCK_USER.email },
    { id: "4", header: "Birthday", content: MOCK_USER.birthday },
    {
      id: "5",
      header: "Addresses",
      content: (
        <ul>
          {MOCK_USER.addresses.map((add, index) => (
            <li className="list-decimal ml-4" key={index}>
              {add}
            </li>
          ))}
        </ul>
      ),
    },
  ];
  return (
    <>
      <Header level={1}>User Detail</Header>

      {/* General data */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          I. User Infomations
        </Header>
        <Button variant={EButtonType.outline}>Edit</Button>
      </div>

      <DetailTable rows={rows} headerClassName="w-36" />

      {/* General data */}
      <Header level={4}>II. Orders</Header>

      <OrdersTable orders={MOCK_ORDERS} />

      {/* General data */}
      <Header className="mt-4" level={4}>
        III. Cart
      </Header>

      <ProductsCartTable products={MOCK_PRODUCT_IN_CART} />
    </>
  );
};
