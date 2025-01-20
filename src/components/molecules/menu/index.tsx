import { Link } from "@/components/atoms/link";
import { joinClass } from "@/helpers/style";
import { TMenu } from "@/types/menu";
import React from "react";

const DEFAULT_HORIZONTAL = "flex flex-col";

const DEFAULT_VERTICAL = "flex flex-row";

const BASE_ITEM_STYLE =
  "py-2 px-4 cursor-pointer border-b-2 border-transparent hover:border-primary-100 hover:bg-gray-200 hover:text-primary-100";

export const Menu: React.FC<TMenu> = ({
  direction,
  items,
  className,
  activeId,
}) => {
  const directionStyle =
    direction === "horizontal" ? DEFAULT_HORIZONTAL : DEFAULT_VERTICAL;

  return (
    <ul className={joinClass(directionStyle, className)}>
      {items.map((item) => {
        const activeClassName =
          item.id === activeId
            ? "!border-primary-200 !bg-gray-300 !text-primary-200"
            : "";

        return (
          <li
            className={joinClass(BASE_ITEM_STYLE, activeClassName)}
            key={item.id}
          >
            <Link href={item.url} className={joinClass(item.className)}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
