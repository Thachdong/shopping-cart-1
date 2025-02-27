import { Blogposts } from "@/components/pages/admin/blogposts";
import { getBlogpostsTableService } from "@/services/blogpost-services";

export default async function BlogpostsPage() {
  const blogposts = await getBlogpostsTableService();

  return <Blogposts blogposts={blogposts} />;
}
