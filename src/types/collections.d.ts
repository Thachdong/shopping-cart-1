import { TUploadedFile } from "./form";

// #region -- component props
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
// #endregion

// #region -- data type
type TCreateCollectionForm = {
  name: string;
  description: string;
  productIds: number[];
  blogpostIds: number[];
};
type TCreateCollection = TCreateCollectionForm & {
  banner: TUploadedFile;
};

type TAdminCollection = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

type TAdminCollectionDetail = TAdminCollection & {
  banner: TUploadedFile;
};

type TAdminCollectionDetailProps = {
  collection: TAdminCollectionDetail | null;
};
// #endrigion
