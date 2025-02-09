import { BlogPostList } from "@/components/organisms/blogpost-list";
import { popularBlogposts } from "../data";

export default async function BlogsPage() {
  return <BlogPostList className="mb-4" blogposts={popularBlogposts} />;
}
