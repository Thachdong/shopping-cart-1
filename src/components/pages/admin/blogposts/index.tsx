import { AdminPageHeader } from "@/components/molecules/admin-page-header";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { BlogpostsTable } from "./blogposts-table";

export const Blogposts: React.FC = () => {
  return (
    <>
      {/* Header */}
      <AdminPageHeader
        header="Blogposts"
        pathName={genPath(EPath.adminBlogposts, "create")}
      />

      <BlogpostsTable />
    </>
  );
};
