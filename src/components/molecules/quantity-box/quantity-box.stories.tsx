import { QuantityBox } from ".";

export default {
  component: QuantityBox,
  title: "Molecules/Quantity Box",
  args: {
    quantity: 1,
    increaseQuantity: () => {
      console.log("Increase Quantity");
    },
    decreaseQuantity: () => {
      console.log("Decrease Quantity");
    },
  },
};

export const Default = {};
