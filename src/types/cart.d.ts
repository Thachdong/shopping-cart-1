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

// #region -- Cart context
type TCartContext = {
  count: number;
  products: TProductInCart[];
  addProduct: (product: TProductInCart) => void;
  removeProduct: (productId: number) => void;
  updateProduct: (productId: number, quantity: number) => void;
};

type TCartProvider = {
  children: React.ReactNode;
};
// #endregion
