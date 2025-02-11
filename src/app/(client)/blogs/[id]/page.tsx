import { BlogDetail } from "@/components/pages/blog-detail";
import { popularBlogposts } from "../../data";

export default async function BlogDetailPage() {
  return <BlogDetail post={popularBlogposts[0]} />;
}
