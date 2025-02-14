type TCardThumbnails = {
  thumbnails: string[];
  className?: string;
};

type TProductCard = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  stock: number;
  thumbnails: string[];
};

type TProductCardProps = {
  product: TProductCard;
  className?: string;
};

type TProductList = {
  products: TProductCard[];
  title: string;
  className?: string;
  listClassName?: string;
  loadMoreAction?: () => void;
  viewAllPath?: string;
};

type TProductListPageProps = {
  products: TProductCard[];
};

type TProductDetailPageProps = {
  product: TProductCard;
};

type TAdminProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  percentOff: number;
  createAt: string;
};

type TAdminProductsPageProps = {
  products: TAdminProduct[];
};
