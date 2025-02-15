import { Header } from "@/components/atoms/header";
import { BlogPostList } from "@/components/organisms/blogpost-list";
import { SearchAndSortBox } from "@/components/organisms/search-and-sort-box";
import React from "react";

export const BlogsList: React.FC<Readonly<TBlogpostListPageProps>> = ({
  posts,
}) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr]">
      <Header className="mt-4" level={1}>
        Blog Posts List
      </Header>

      <SearchAndSortBox />

      <div className="py-4">
        <BlogPostList blogposts={posts} />
      </div>
    </div>
  );
};
