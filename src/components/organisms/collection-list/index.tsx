import { CollectionCard } from "@/components/molecules/collection-card";
import { joinClass } from "@/helpers/style";
import React from "react";

const LIST_CLASSNAME = "flex flex-col gap-y-4";

export const CollectionList: React.FC<Readonly<TCollectionList>> = ({
  collections,
  className,
}) => {
  return (
    <div className={joinClass(LIST_CLASSNAME, className)}>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} {...collection} />
      ))}
    </div>
  );
};
