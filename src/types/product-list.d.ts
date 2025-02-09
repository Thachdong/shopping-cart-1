type TProductList = {
  products: TProductCard[];
  title: string;
  className?: string;
  listClassName?: string;
  loadMoreAction?: () => void;
  viewAllPath?: string;
};
