import { BlogpostDetail } from "@/components/pages/admin/blogpost-detail";
import { getBlogpostByIdService } from "@/services/blogpost-services";

type TBlogpostDetailPageProps = {
  params: Promise<{ id: string }>;
};
export default async function BlogpostDetailPage({
  params,
}: TBlogpostDetailPageProps) {
  const postId = (await params).id;

  const postDetail = await getBlogpostByIdService(Number(postId));

  return <BlogpostDetail blogpost={postDetail} />;
}
