import { Collections } from "@/components/pages/admin/collections";
import { getCollectionsService } from "@/services/collection-services";

export default async function CollectionsPage() {
  const collections = await getCollectionsService();

  return <Collections {...collections} />;
}
