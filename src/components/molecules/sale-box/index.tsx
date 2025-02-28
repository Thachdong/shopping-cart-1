import { Icon } from "@/components/atoms/icon";
import { PriceBox } from "@/components/atoms/price-box";
import { EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";
import { TSaleBox } from "@/types/sale-box";
import React from "react";

const DEFAULT_STYLE = "flex gap-2 items-center";

export const SaleBox: React.FC<Readonly<TSaleBox>> = ({
  price,
  sale,
  currency,
  className,
}) => {
  return (
    <div className={joinClass(DEFAULT_STYLE, className)}>
      <PriceBox price={price} currency={currency} isValid={false} />

      <Icon width={12} name={EIconName["right-arrow"]} />

      <PriceBox price={sale} currency={currency} />
    </div>
  );
};
