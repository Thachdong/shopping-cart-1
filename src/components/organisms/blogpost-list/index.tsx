import { Button } from "@/components/atoms/button";
import { BlogpostCard } from "@/components/molecules/blogpost-card";
import { EButtonType } from "@/constants";
import { joinClass } from "@/helpers/style";

const LIST_CLASSNAME = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";

export const BlogPostList: React.FC<Readonly<TBlogpostList>> = ({
  blogposts,
  className,
  loadMoreAction,
}) => {
  return (
    <div className={joinClass(LIST_CLASSNAME, className)}>
      {blogposts.map((blogpost) => (
        <BlogpostCard key={blogpost.id} {...blogpost} />
      ))}

      {loadMoreAction && (
        <Button
          className="mt-4 mx-auto"
          onClick={loadMoreAction}
          variant={EButtonType.outline}
        >
          Load More
        </Button>
      )}
    </div>
  );
};
