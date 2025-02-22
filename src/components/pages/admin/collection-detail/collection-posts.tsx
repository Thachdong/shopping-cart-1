"use client";
import { Header } from "@/components/atoms/header";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostsByCollIdAction } from "@/server-actions/collection";
import { AddBlogpostButton } from "./add-blogpost-button";
import { BlogpostsTable } from "./blogpost-table";

export const CollectionPosts: React.FC = () => {
  const [posts, setPosts] = useState<TBlogpost[]>([]);
  const { id } = useParams();

  const fetchPosts = useCallback(async () => {
    if (!id || Number.isNaN(Number(id))) return;

    const { success, data } = await getPostsByCollIdAction(Number(id));

    if (success && Array.isArray(data)) {
      setPosts([...data]);
    }
  }, [id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <>
      <div className="flex items-center gap-4 my-4">
        <Header className="!mb-0" level={4}>
          III. Blog posts
        </Header>
        <AddBlogpostButton
          postIds={posts.map((p) => p.id)}
          fetchPosts={fetchPosts}
        />
      </div>

      <BlogpostsTable posts={posts} fetchPosts={fetchPosts} />
    </>
  );
};
