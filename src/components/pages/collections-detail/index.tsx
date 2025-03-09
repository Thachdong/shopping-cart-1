import { CollectionList } from "@/components/organisms/collection-list";
import { Header } from "@/components/atoms/header";
import { SearchAndSortBox } from "@/components/organisms/search-and-sort-box";
import React from "react";
import { TCollectionDetailPageProps } from "@/types/collections";

export const CollectionsDetail: React.FC<
  Readonly<TCollectionDetailPageProps>
> = ({ collection }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr]">
      <Header className="mt-4" level={1}>
        {collection.title}
      </Header>

      <SearchAndSortBox />

      <div className="py-4">
        <CollectionList collections={[collection]} />
      </div>
    </div>
  );
};
