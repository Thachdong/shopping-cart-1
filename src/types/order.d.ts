type TOrder = {
  id: number;
  createdAt: string;
  username: string;
  userId: number;
  shippingAddress: string;
  paymentMethod: string;
  isComplete: boolean;
  completeDate: string;
  phoneNumber: string;
  discount: number;
  shippingFee: number;
  shippingVender: string;
  total: number;
  products: { id: number; name: string }[];
};

type OrderTableProps = {
  orders: TOrder[];
};
