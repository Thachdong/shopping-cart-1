import { Button } from "@/components/atoms/button";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import React from "react";

export const QuantityBox: React.FC<TQuantityBox> = ({
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="flex items-stretch w-min border">
      <Button className="!px-1" onClick={decreaseQuantity}>
        <Icon name={EIconName.minus} />
      </Button>

    <span className="leading-9 min-w-10 text-center border-l border-r">{quantity}</span>

      <Button className="!px-1" onClick={increaseQuantity}>
        <Icon name={EIconName.plus} />
      </Button>
    </div>
  );
};
