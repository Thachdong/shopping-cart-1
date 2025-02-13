"use client";
import { Header } from "@/components/atoms/header";
import { Icon } from "@/components/atoms/icon";
import { Menu } from "@/components/molecules/menu";
import { EIconName } from "@/constants";
import { TMenuItem } from "@/types/menu";
import React, { useCallback, useMemo, useState } from "react";

const ITEMS: TMenuItem[] = [
  {
    id: "1",
    label: "Collections",
    url: "/admin/collections",
    iconName: EIconName.collections,
  },
  {
    id: "2",
    label: "Products",
    url: "/admin/products",
    iconName: EIconName.products,
  },
  {
    id: "3",
    label: "Blog posts",
    url: "/admin/blogposts",
    iconName: EIconName.blogposts,
  },
  {
    id: "4",
    label: "Orders",
    url: "/admin/orders",
    iconName: EIconName.orders,
  },
  {
    id: "5",
    label: "Asset Management",
    url: "/admin/asset-management",
    iconName: EIconName["asset-management"],
  },
  {
    id: "6",
    label: "Page Setting",
    url: "/admin/settings",
    iconName: EIconName.settings,
  },
  { id: "7", label: "Users", url: "/admin/users", iconName: EIconName.users },
];

export const AdminSidebar: React.FC = () => {
  const [isExpand, setIsExpand] = useState<boolean>(true);

  const toggleExpand = useCallback(() => {
    setIsExpand((pre) => !pre);
  }, []);

  const absoluteIcon = useMemo(() => {
    if (isExpand) {
      return EIconName["caret-circle-left"];
    } else {
      return EIconName["caret-circle-right"];
    }
  }, [isExpand]);
  return (
    <div className="relative border-r border-gray-300">
      {/* logo */}
      <Header
        className="uppercase tracking-widest !text-2xl select-none mr-4 text-center border-b border-gray-300 w-full py-2"
        level={1}
      >
        moni.sh
      </Header>

      <Menu direction="horizontal" items={ITEMS} />

      <Icon
        iconClassName="absolute top-3 right-0 cursor-pointer"
        onClick={toggleExpand}
        name={absoluteIcon}
      />
    </div>
  );
};
