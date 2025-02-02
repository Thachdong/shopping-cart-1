type TProductList = {
  products: Pick<TProductCard, "product">[];
  title: string;
  className?: string;
  listClassName?: string;
  loadMoreAction?: () => void;
};
