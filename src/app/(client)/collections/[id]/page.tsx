import { CollectionsDetail } from "@/components/pages/collections-detail";
import { popularCollections } from "../../data";

export default async function CollectionDetailPage() {
  return <CollectionsDetail collection={popularCollections[0]} />;
}
