"use client";

import { ECurrency } from "@/constants";
import { joinClass } from "@/helpers/style";
import { TPriceBox } from "@/types/price-box";
import React, { useMemo } from "react";

const DEFAULT_STYLE = "text-primary-100 inline-block font-bold text-lg";

const INVALID_STYLE = "line-through text-secondary-100";

export const PriceBox: React.FC<Readonly<TPriceBox>> = ({
  price,
  currency,
  className,
  isValid = true,
}) => {
  const text: string = useMemo(() => {
    let val = Number(price);

    if (Number.isNaN(val)) {
      val = 0;
    }

    const safeValue = val.toFixed(2);

    return [safeValue, currency || ECurrency.USD].join("");
  }, [price, currency]);

  return (
    <div
      className={joinClass(
        DEFAULT_STYLE,
        isValid ? "" : INVALID_STYLE,
        className,
      )}
    >
      {text}
    </div>
  );
};
