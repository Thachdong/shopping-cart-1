"use client";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { CollectionsTable } from "./collections-table";
import { AdminPageHeader } from "@/components/molecules/admin-page-header";
import { TAdminCollection } from "@/types/collections";

export const Collections: React.FC<TPaginationResponse<TAdminCollection>> = ({
  total,
  nextPage,
  items,
}) => {
  console.log(total, nextPage);
  return (
    <>
      {/* Header */}
      <AdminPageHeader
        header="Collections"
        pathName={genPath(EPath.adminCollections, "create")}
      />

      {/* Collection table */}
      <CollectionsTable collections={items} />
    </>
  );
};
