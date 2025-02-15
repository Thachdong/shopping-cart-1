type TProductInCart = {
  id: number;
  name: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  quantity: number;
  total: number;
};

type TProductCartProps = {
  products: TProductInCart[];
};
