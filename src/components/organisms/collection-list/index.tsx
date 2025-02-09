import { CollectionCard } from "@/components/molecules/collection-card";
import { joinClass } from "@/helpers/style";
import React from "react";
import { ProductList } from "../product-list";

const LIST_CLASSNAME = "flex flex-col gap-y-4";

export const CollectionList: React.FC<Readonly<TCollectionList>> = ({
  collections,
  className,
}) => {
  return (
    <div className={joinClass(LIST_CLASSNAME, className)}>
      {collections.map((collection) => (
        <div key={collection.id}>
          <CollectionCard key={collection.id} {...collection} />

          <ProductList title="" products={collection.products} />
        </div>
      ))}
    </div>
  );
};
