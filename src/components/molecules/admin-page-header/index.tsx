import { Header } from "@/components/atoms/header";
import React from "react";
import { LinkAsButton } from "../link-as-button";
import { EButtonType } from "@/constants";

export const AdminPageHeader: React.FC<TAdminPageHeader> = ({
  header,
  pathName,
  buttonText,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Header level={1}>{header}</Header>

      {pathName && (
        <LinkAsButton
          buttonProps={{ variant: EButtonType.outline }}
          href={pathName}
        >
          {buttonText || "Create"}
        </LinkAsButton>
      )}
    </div>
  );
};
