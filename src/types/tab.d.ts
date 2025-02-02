type TTabItem = {
  id: string;
  label: ReactNode;
  content: ReactNode;
};

type TTab = {
  items: TTabItem[];
  initTabId: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
};
