import { Header } from "@/components/atoms/header";
import { OrderTable } from "@/components/organisms/order-table";
import React from "react";
import styles from "@/components/molecules/table/table.module.scss";
import { joinClass } from "@/helpers/style";
import { Button } from "@/components/atoms/button";
import { EButtonType } from "@/constants";

const MOCK_ADDRESS = {
  username: "dongt",
  phone: "0353.860.797",
  address: "245 Thong Nhat, Go Vap, HCM city",
};

const MOCK_SHIPPING_AGENTS = [
  {
    name: "J&T",
    id: "JT",
  },
  {
    name: "Giao Hàng Nhanh",
    id: "GHN",
  },
  {
    name: "Giao Tiết Kiệm",
    id: "GHTK",
  },
];

export const Checkout: React.FC = () => {
  return (
    <div>
      <Header className="my-4" level={1}>
        Checkout
      </Header>

      {/* Order summary */}
      <Header className="font-bold mb-2" level={6}>
        I. Order summary:
      </Header>
      <OrderTable />

      {/* Address */}
      <Header className="font-bold mb-2 mt-4" level={6}>
        II. Address:
      </Header>

      <table className={joinClass(styles["table-border"], "w-full mb-4")}>
        <tbody>
          <tr>
            <td>
              <b>User name:</b> {MOCK_ADDRESS.username}
            </td>
            <td>
              <b>Phone:</b> {MOCK_ADDRESS.phone}
            </td>
            <td>
              <address>
                <b>Address:</b> {MOCK_ADDRESS.address}
              </address>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Shipping */}
      <Header className="font-bold mb-2" level={6}>
        III. Shipping:
      </Header>

      <ul className="mb-4">
        {MOCK_SHIPPING_AGENTS.map((agent) => (
          <li key={agent.id}>
            <label>
              <input
                className="mr-2"
                type="radio"
                value={agent.id}
                name="shipping"
              />
              {agent.name}
            </label>
          </li>
        ))}
      </ul>

      {/* Payment */}
      <Header className="font-bold mb-2" level={6}>
        IV. Payment:
      </Header>

      <p className="text-sm italic mb-4">Ship COD only</p>

      <div className="text-center mb-12 w-1/2 mx-auto border-t border-gray-300 pt-4">
        <Button variant={EButtonType.outline}>COMPLETE ORDER</Button>
      </div>
    </div>
  );
};
