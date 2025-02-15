import { Header } from "@/components/atoms/header";
import React from "react";
import { LinkAsButton } from "../link-as-button";
import { useBgImage } from "@/libs/hooks/useBgImage";
import { joinClass } from "@/helpers/style";
import { genPath } from "@/helpers/router";
import { EPath } from "@/constants";

const DEFAULT_CLASSNAME =
  "flex flex-col items-center justify-center gap-4 p-4 border border-gray-200 rounded-lg text-primary-100";

export const CollectionCard: React.FC<Readonly<TCollectionCard>> = ({
  className,
  width,
  height,
  ...collection
}) => {
  const style = useBgImage(collection.banner);

  if (width) {
    style.width = width + "px";
  }

  if (height) {
    style.height = height + "px";
  }

  return (
    <div className={joinClass(DEFAULT_CLASSNAME, className)} style={style}>
      <Header level={3}>{collection.title}</Header>
      <p>{collection.description}</p>
      <LinkAsButton
        href={genPath(EPath.collections, collection.id)}
        buttonProps={{
          variant: "outline",
        }}
      >
        View collection
      </LinkAsButton>
    </div>
  );
};
