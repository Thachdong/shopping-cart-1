"use client";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { CollectionsTable } from "./collections-table";
import { AdminPageHeader } from "@/components/molecules/admin-page-header";

export const Collections: React.FC = () => {
  return (
    <>
      {/* Header */}
      <AdminPageHeader
        header="Collections"
        pathName={genPath(EPath.adminCollections, "create")}
      />

      {/* Collection table */}
      <CollectionsTable />
    </>
  );
};
