import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import React from "react";

export const AdminHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between h-[49px] border-b border-gray-300 px-2">
      <div></div>
      <div className="flex items-center gap-2">
        <span>Dongt</span>
        <Icon name={EIconName["sign-out"]} />
      </div>
    </div>
  );
};
