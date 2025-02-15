import { ProductList } from ".";

export default {
  title: "Organisms/ProductList",
  component: ProductList,
  args: {
    title: "Product List",
    products: [
      {
        id: "1",
        name: "Product 1",
        price: 100,
        thumbnails: [
          "./mock-images/product-1.jpeg",
          "./mock-images/product-2.webp",
          "./mock-images/product-3.webp",
          "./mock-images/product-4.webp",
        ],
      },
      {
        id: "2",
        name: "Product 2",
        price: 200,
        thumbnails: [
          "./mock-images/product-1.jpeg",
          "./mock-images/product-2.webp",
          "./mock-images/product-3.webp",
          "./mock-images/product-4.webp",
        ],
      },
      {
        id: "3",
        name: "Product 3",
        price: 300,
        thumbnails: [
          "./mock-images/product-1.jpeg",
          "./mock-images/product-2.webp",
          "./mock-images/product-3.webp",
          "./mock-images/product-4.webp",
        ],
      },
      {
        id: "4",
        name: "Product 4",
        price: 400,
        thumbnails: [
          "./mock-images/product-1.jpeg",
          "./mock-images/product-2.webp",
          "./mock-images/product-3.webp",
          "./mock-images/product-4.webp",
        ],
      },
      {
        id: "5",
        name: "Product 5",
        price: 500,
        thumbnails: [
          "./mock-images/product-1.jpeg",
          "./mock-images/product-2.webp",
          "./mock-images/product-3.webp",
          "./mock-images/product-4.webp",
        ],
      },
      {
        id: "6",
        name: "Product 6",
        price: 600,
        thumbnails: [
          "./mock-images/product-1.jpeg",
          "./mock-images/product-2.webp",
          "./mock-images/product-3.webp",
          "./mock-images/product-4.webp",
        ],
      },
    ],
  },
};

export const Default = {};
