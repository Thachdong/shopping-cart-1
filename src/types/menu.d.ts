import { EIconName } from "@/constants";
import { ReactNode } from "react";

type TMenuItem = {
  id: string;
  label: ReactNode;
  url: string;
  className?: string;
  iconName?: EIconName;
};

type TMenu = {
  direction: "horizontal" | "vertical";
  items: TMenuItem[];
  className?: string;
  activeId?: string;
};
