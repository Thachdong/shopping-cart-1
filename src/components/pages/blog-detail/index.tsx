import { Header } from "@/components/atoms/header";

export const BlogDetail: React.FC<Readonly<TBlogpostDetailPageProps>> = ({
  post,
}) => {
  return (
    <div className="px-2 py-4">
      {/* Post title */}
      <Header className="text-center" level={1}>
        {post.title}
      </Header>
      {/* Publish date */}
      <p>Publish date: {post.publishDate}</p>
      {/* Post content */}
      <div>{post.description}</div>
    </div>
  );
};
