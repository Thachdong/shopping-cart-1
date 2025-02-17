import { TUploadedFile } from "./form";

type TCollectionList = {
  collections: TCollectionCard[];
  className?: string;
};

type TCollectionCard = {
  id: string;
  title: string;
  description: string;
  banner: string;
  products: TProductCard[];
  className?: string;
  width?: string;
  height?: string;
};

type TCollectionListPageProps = {
  collections: TCollectionCard[];
};

type TCollectionDetailPageProps = {
  collection: TCollectionCard;
};

type TCreateCollection = {
  name: string;
  description: string;
  banner?: TUploadedFile;
  productIds: number[];
  blogpostIds: number[];
};

type TAdminCollection = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};
