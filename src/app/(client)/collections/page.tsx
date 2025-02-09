import { CollectionList } from "@/components/organisms/collection-list";
import { popularCollections } from "../data";

export default async function CollectionsPage() {
  return (
    <div className="py-4">
      <CollectionList collections={popularCollections} />
    </div>
  );
}
