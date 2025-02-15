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
  items: { id: number; name: string }[];
};

type OrderTableProps = {
  orders: TOrder[];
};

type TOrderItem = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  discountPercent: number;
  discountPrice: number;
  total: number;
};

type TOrderDetail = Omit<TOrder, "items"> & {
  items: TOrderItem[];
};

type TOrderItemsTableProps = {
  items: TOrderItem[];
};
