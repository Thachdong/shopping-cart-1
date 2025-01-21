type TCardThumbnails = {
  thumbnails: string[];
  className?: string;
};

type TProductCard = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPercent: number;
    discountPrice: number;
    stock: number;
    thumbnails: string[];
  };
  className?: string;
};
