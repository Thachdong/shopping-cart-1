import { TCollectionCard } from "@/types/collections";
import { TProductCard } from "@/types/product";

const thumbnails = [
  "/mock-images/product-1.jpeg",
  "/mock-images/product-2.webp",
  "/mock-images/product-3.webp",
  "/mock-images/product-4.webp",
];

export const bestProducts: TProductCard[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "A timeless white t-shirt.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    description: "Comfortable blue denim jeans.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 3,
    name: "Black Leather Jacket",
    description: "Stylish black leather jacket.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 4,
    name: "Red Summer Dress",
    description: "Light and breezy red dress.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 5,
    name: "White Sneakers",
    description: "Comfortable white sneakers.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 6,
    name: "Black Dress Pants",
    description: "Elegant black dress pants.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 7,
    name: "Grey Hoodie",
    description: "Cozy grey hoodie.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 8,
    name: "Blue Baseball Cap",
    description: "Casual blue baseball cap.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 9,
    name: "Black Sunglasses",
    description: "Stylish black sunglasses.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 10,
    name: "Brown Leather Belt",
    description: "Durable brown leather belt.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 11,
    name: "White Dress Shirt",
    description: "Formal white dress shirt.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 12,
    name: "Blue Striped Tie",
    description: "Elegant blue striped tie.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 13,
    name: "Black Ankle Boots",
    description: "Stylish black ankle boots.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 14,
    name: "Green Cargo Pants",
    description: "Comfortable green cargo pants.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 15,
    name: "Yellow Raincoat",
    description: "Bright yellow raincoat.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 16,
    name: "Black Beanie",
    description: "Warm black beanie.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 17,
    name: "White Tennis Skirt",
    description: "Sporty white tennis skirt.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 18,
    name: "Blue Swim Trunks",
    description: "Comfortable blue swim trunks.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 19,
    name: "Black Running Shoes",
    description: "Durable black running shoes.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
  {
    id: 20,
    name: "Red Wool Scarf",
    description: "Warm red wool scarf.",
    thumbnails,
    price: 150000,
    discountPercent: 0,
    discountPrice: 150000,
    stock: 10,
  },
];

export const MOCK_DATA = {
  herroBanner: "/mock-images/home-banner.jpg",
};

export const popularCollections: TCollectionCard[] = [
  {
    id: 1,
    title: "Best seller",
    description: "Best seller description",
    banner: "/mock-images/home-banner.jpg",
    products: bestProducts.slice(8),
  },
  {
    id: 2,
    title: "Best seller",
    description: "Best seller description",
    banner: "/mock-images/home-banner.jpg",
    products: bestProducts.slice(8, 16),
  },
  {
    id: 3,
    title: "Best seller",
    description: "Best seller description",
    banner: "/mock-images/home-banner.jpg",
    products: bestProducts.slice(8, 16),
  },
  {
    id: 4,
    title: "Best seller",
    description: "Best seller description",
    banner: "/mock-images/home-banner.jpg",
    products: bestProducts.slice(9, 17),
  },
  {
    id: 5,
    title: "Best seller",
    description: "Best seller description",
    banner: "/mock-images/home-banner.jpg",
    products: bestProducts.slice(9, 17),
  },
  {
    id: 6,
    title: "Best seller",
    description: "Best seller description",
    banner: "/mock-images/home-banner.jpg",
    products: bestProducts.slice(9, 17),
  },
];

export const popularBlogposts: TBlogpostCard[] = [
  {
    id: 1,
    title: "Blogpost title",
    description: "Blogpost description",
    image: "/mock-images/product-1.jpeg",
    publishDate: "02/01/2025",
  },
  {
    id: 2,
    title: "Blogpost title",
    description: "Blogpost description",
    image: "/mock-images/product-1.jpeg",
    publishDate: "02/01/2025",
  },
  {
    id: 3,
    title: "Blogpost title",
    description: "Blogpost description",
    image: "/mock-images/product-1.jpeg",
    publishDate: "02/01/2025",
  },
  {
    id: 4,
    title: "Blogpost title",
    description: "Blogpost description",
    image: "/mock-images/product-1.jpeg",
    publishDate: "02/01/2025",
  },
  {
    id: 5,
    title: "Blogpost title",
    description: "Blogpost description",
    image: "/mock-images/product-1.jpeg",
    publishDate: "02/01/2025",
  },
  {
    id: 6,
    title: "Blogpost title",
    description: "Blogpost description",
    image: "/mock-images/product-1.jpeg",
    publishDate: "02/01/2025",
  },
];
