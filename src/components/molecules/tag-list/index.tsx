import { Tag } from "@/components/atoms/tag";
import { joinClass } from "@/helpers/style";
import React from "react";

const DEFAULT_TAG_LIST_CLASSNAME = "flex flex-wrap gap-2";

export const TagList: React.FC<Readonly<TTagList>> = ({ tags, className }) => {
  return (
    <div className={joinClass(DEFAULT_TAG_LIST_CLASSNAME, className)}>
      {tags.map(({ content, ...props }, index) => (
        <Tag key={index} content={content} {...props} />
      ))}
    </div>
  );
};
