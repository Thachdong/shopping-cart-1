import { CollectionDetail } from "@/components/pages/admin/collection-detail";
import { getCollectionById } from "@/services/collection-services";

type TPageProps = {
  params: Promise<{ id: string }>;
};
export default async function CollectionsPage({ params }: TPageProps) {
  const id = (await params).id;

  const collection = await getCollectionById(parseInt(id));

  return <CollectionDetail collection={collection} />;
}
