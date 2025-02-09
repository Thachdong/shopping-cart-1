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
