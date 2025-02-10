"use client";
import { joinClass } from "@/helpers/style";
import React, { useCallback, useMemo } from "react";

const DEFAULT_PANEL_CLASSNAME = "flex items-center border-b-2 border-gray-200";
const DEFAULT_PANEL_ITEM_CLASSNAME = "cursor-pointer py-2 px-4";
const ACTIVE_PANEL_ITEM_CLASSNAME =
  "border-primary-100 bg-gray-200 text-primary-100 font-bold";

export const Tab: React.FC<Readonly<TTab>> = ({
  items,
  initTabId,
  className,
  tabClassName,
  contentClassName,
}) => {
  const [activeTab, setActiveTab] = React.useState(initTabId);

  const activateTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const tabPanel = useMemo(() => {
    return items.map((item) => {
      const activeClass =
        item.id === activeTab ? ACTIVE_PANEL_ITEM_CLASSNAME : "";

      return (
        <li
          className={joinClass(DEFAULT_PANEL_ITEM_CLASSNAME, activeClass)}
          key={item.id}
          onClick={() => activateTab(item.id)}
        >
          {item.label}
        </li>
      );
    });
  }, [activateTab, items, activeTab]);

  const tabContents = useMemo(() => {
    return items.map((item) => item.id === activeTab && item.content);
  }, [items, activeTab]);

  return (
    <div className={joinClass(className)}>
      <ul className={joinClass(tabClassName, DEFAULT_PANEL_CLASSNAME)}>
        {tabPanel}
      </ul>

      <div className={joinClass(contentClassName)}>{tabContents}</div>
    </div>
  );
};
