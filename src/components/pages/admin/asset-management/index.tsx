import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { Icon } from "@/components/atoms/icon";
import { BaseInput } from "@/components/molecules/form-tags/base-input";
import { BaseUpload } from "@/components/molecules/form-tags/base-upload";
import { EButtonType, EIconName } from "@/constants";
import React from "react";

export const AssetManagement: React.FC = () => {
  return (
    <div className="p-2">
      <Header className="mb-4" level={1}>
        Asset Management
      </Header>

      <Header className="mb-4" level={4}>
        Icons
      </Header>

      {/* Create icon */}
      <div className="flex gap-2 items-center mb-4">
        <BaseUpload>
          <Icon name={EIconName.upload} />
        </BaseUpload>
        <BaseInput placeholder="Icon name" />
        <Button variant={EButtonType.primary}>Create</Button>
      </div>

      {/* Icons list */}
      <div className="grid lg:grid-cols-6 gap-6 md:grid-cols-4 sm:grid-cols-2 mb-4">
        {Object.values(EIconName).map((icon) => (
          <div key={icon} className="flex items-center justify-between gap-2">
            {icon}:
            <Icon name={icon} />
          </div>
        ))}
      </div>

      <Header className="mb-4" level={4}>
        S3 Assets
      </Header>
    </div>
  );
};
