enum ECurrency {
  "VND" = "VND",
  "USD" = "$",
}

type TPriceBox = {
  price: number;
  currency?: ECurrency;
  className?: string;
  isValid?: boolean;
};
