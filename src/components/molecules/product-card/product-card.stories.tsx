import { ProductCard } from ".";

const thumbnails = [
  "https://placehold.co/400x600.png?index=1",
  "https://placehold.co/400x600.png?index=2",
  "https://placehold.co/400x600.png?index=3",
  "https://placehold.co/400x600.png?index=4",
  "https://placehold.co/400x600.png?index=5",
  "https://placehold.co/400x600.png?index=6",
  "https://placehold.co/400x600.png?index=7",
];

const MOCK_PRODUCT = {
  id: "1",
  name: "Product Name",
  description: "Product description",
  price: 99,
  discountPercent: 25,
  discountPrice: 69,
  stock: 100,
  thumbnails,
};

export default {
  component: ProductCard,
  title: "Molecules/Product Card",
  args: {
    product: MOCK_PRODUCT,
    className: "w-[275px]",
  },
};

export const Default = {};
