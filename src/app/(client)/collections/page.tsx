import { popularCollections } from "../data";
import { Collections } from "@/components/pages/collections-list";

export default async function CollectionsPage() {
  return <Collections collections={popularCollections} />;
}
