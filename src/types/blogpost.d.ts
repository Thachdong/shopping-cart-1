type TBlogpostList = {
  blogposts: TBlogpostCard[];
  className?: string;
  loadMoreAction?: () => void;
};

type TBlogpostListPageProps = {
  posts: TBlogpostCard[];
};

type TBlogpostCard = {
  id: number;
  title: string;
  description: string;
  image: string;
  publishDate: string;
  className?: string;
};

type TBlogpostDetailPageProps = {
  post: TBlogpostCard;
};

type TBlogpost = {
  id: number;
  title: string;
  description: string;
  publishDate: string;
  products: { id: number; name: string }[];
  collections: { id: number; name: string }[];
};

type TCreateBlogpost = {
  title: string;
  description: string;
  publishDate: string;
  post: string;
  productIds: number[];
  collectionIds: number[];
};

type TBlogpostDetail = {
  id: number;
  title: string;
  description: string;
  post: string;
  publishDate: string;
  products: { id: number; name: string }[];
  collections: { id: number; name: string }[];
};

type TBlogpostGeneralInfo = {
  title: string;
  description: string;
  publishDate: string;
  productIds: number[];
  collectionIds: number[];
};
