import { PriceBox } from ".";

export default {
  component: PriceBox,
  title: "Price Box",
  args: {
    price: 99,
  },
};

export const VND = {
  args: {
    currency: "VND",
  },
};

export const USD = {
  args: {
    currency: "$",
    className: "text-secondary-100",
  },
};

export const Invalid = {
  args: {
    currency: "$",
    isValid: false,
  },
};
