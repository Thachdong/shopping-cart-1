import { ECurrency } from "@/constants";

type TPriceBox = {
  price: number;
  currency?: ECurrency;
  className?: string;
  isValid?: boolean;
};
