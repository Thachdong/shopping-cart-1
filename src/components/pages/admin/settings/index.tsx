import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { EButtonType } from "@/constants";
import { TDetailTableRow } from "@/types/table";
import React from "react";

export const Settings: React.FC = () => {
  const profileRows: TDetailTableRow[] = [
    { id: "1", header: "Logo", content: "" },
    { id: "2", header: "Hotline", content: "" },
    { id: "3", header: "Email", content: "" },
    { id: "4", header: "Address", content: "" },
    { id: "5", header: "Related Links", content: "" },
  ];

  const homeRows: TDetailTableRow[] = [
    { id: "1", header: "Banner", content: "" },
    { id: "2", header: "Title", content: "" },
    { id: "3", header: "Description", content: "" },
    { id: "4", header: "Top Collection", content: "" },
    { id: "5", header: "Popular Collections", content: "" },
  ];
  return (
    <>
      <Header level={1}>Page Settings</Header>

      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          I. SHOP PROFILE
        </Header>
        <Button variant={EButtonType.outline}>Add</Button>
      </div>
      {/* 
            SHOP PROFILE
        - LOGO
        - HOTLINE
        - EMAIL
        - ADDRESS
        - RELATED LINKS
      */}
      <DetailTable rows={profileRows} headerClassName="w-30" />

      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          II. HOME PAGE
        </Header>
        <Button variant={EButtonType.outline}>Add</Button>
      </div>
      {/* 
            HOME PAGE
        - BANNER
        - TITLE
        - DESCRIPTION
        - TOP COLLECTION
        - POPULAR COLLECTIONS
      */}
      <DetailTable rows={homeRows} headerClassName="w-48" />
    </>
  );
};
