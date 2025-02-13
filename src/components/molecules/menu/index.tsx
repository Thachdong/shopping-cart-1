"use client";
import { Icon } from "@/components/atoms/icon";
import { Link } from "@/components/atoms/link";
import { joinClass } from "@/helpers/style";
import { TMenu } from "@/types/menu";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const DEFAULT_HORIZONTAL = {
  container: "flex flex-col",
  item: "!border-b !border-gray-300",
};

const DEFAULT_VERTICAL = {
  container: "flex flex-row",
  item: "border-b-2 border-transparent hover:border-primary-100",
};

const BASE_ITEM_STYLE =
  "py-2 px-4 w-full inline-block cursor-pointer hover:bg-gray-200 hover:text-primary-100 flex items-center gap-2";

export const Menu: React.FC<TMenu> = ({ direction, items, className }) => {
  const pathname = usePathname();

  const activeId = useMemo(() => {
    // BASE PATHNAMES
    if (pathname === "/") {
      return items.find((i) => i.url === "/")?.id || "";
    }

    // PATHNAMES
    return (
      items.find((i) => i.url !== "/" && pathname.startsWith(i.url))?.id || ""
    );
  }, [items, pathname]);

  const directionStyle =
    direction === "horizontal" ? DEFAULT_HORIZONTAL : DEFAULT_VERTICAL;

  return (
    <ul className={joinClass(directionStyle.container, className)}>
      {items.map((item) => {
        const activeClassName =
          item.id === activeId
            ? "!border-primary-200 !bg-gray-300 !text-primary-100 font-medium"
            : "";

        return (
          <li key={item.id}>
            <Link
              href={item.url}
              className={joinClass(
                directionStyle.item,
                BASE_ITEM_STYLE,
                activeClassName,
                item.className,
              )}
            >
              {item.iconName && <Icon width={18} name={item.iconName} />}
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
