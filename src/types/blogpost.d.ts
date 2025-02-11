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
