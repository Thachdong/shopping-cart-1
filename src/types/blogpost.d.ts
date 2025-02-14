type TBlogpostList = {
  blogposts: TBlogpostCard[];
  className?: string;
  loadMoreAction?: () => void;
};

type TBlogpostListPageProps = {
  posts: TBlogpostCard[];
};

type TBlogpostCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  publishDate: string;
  className?: string;
};

type TBlogpostDetailPageProps = {
  post: TBlogpostCard;
};

type TAdminBlogpost = {
  id: number;
  title: string;
  description: string;
  publishDate: string;
  relatedProducts: { id: number; name: string }[];
  relatedCollections: { id: number; name: string }[];
};
