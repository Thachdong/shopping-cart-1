import { popularBlogposts } from "../data";
import { BlogsList } from "@/components/pages/blogs-list";

export default async function BlogsPage() {
  return <BlogsList posts={popularBlogposts} />;
}
