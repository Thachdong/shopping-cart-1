import { TUploadedFile } from "./form";

type TCardThumbnails = {
  thumbnails: TUploadedFile[];
  className?: string;
};

type TProductCard = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  discountPrice: number;
  stock: number;
  thumbnails: TUploadedFile[];
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
  discountPercent: number;
  createAt: string;
};

type TAdminProductsPageProps = {
  products: TAdminProduct[];
};

// #region -- create product
type TCreateProductForm = {
  name: string;
  description: string;
  collectionIds: number[];
  blogpostIds: number[];
  variantName: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  discountPercent: number;
  discountPrice: number;
};

type TCreateProduct = TCreateProductForm & {
  thumbnails: TUploadedFile[];
  displayImage: TUploadedFile;
};
// #endregion

// #region -- products table
type TProductVariant = {
  id: number;
  variantName: string; // product name + variant name
  price: number;
  stock: number;
  discountPercent: number;
  createdAt: string;
};

type TProductTable = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  variants: TProductVariant[];
};
// #endregion

// #region -- product detail
type TProductDetailVariant = TProductVariant & {
  thumbnails: TUploadedFile[];
};

type TProductDetail = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  collections: { id: number; name: string }[];
  blogposts: { id: number; title: string }[];
  variants: TProductDetailVariant[];
};
// #endregion

type TUpdateProductGeneralInfoServiceParam = {
  name?: string;
  description?: string;
  collectionIds?: number[];
  blogpostIds?: number[];
};

type TCreateVariantServiceParams = {
  variantName: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  discountPercent: number;
  thumbnails: TUploadedFile[];
  discountPrice: number;
};
