import { CollectionList } from "@/components/organisms/collection-list";
import { Header } from "@/components/atoms/header";
import { SearchAndSortBox } from "@/components/organisms/search-and-sort-box";
import React from "react";
import { TCollectionListPageProps } from "@/types/collections";

export const Collections: React.FC<Readonly<TCollectionListPageProps>> = ({
  collections,
}) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr]">
      <Header className="mt-4" level={1}>
        Collections List
      </Header>

      <SearchAndSortBox />

      <div className="py-4">
        <CollectionList collections={collections} />
      </div>
    </div>
  );
};
