"use client";
import { Header } from "@/components/atoms/header";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import { EButtonType, EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { CollectionTable } from "./collection-table";

export const Collections: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Header level={1}>Collections</Header>
        <LinkAsButton
          buttonProps={{ variant: EButtonType.outline }}
          href={genPath(EPath.adminCollections, "create")}
        >
          Create
        </LinkAsButton>
      </div>

      {/* Collection table */}
      <CollectionTable />
    </>
  );
};
