type TAddableBox = {
  contentList: React.ReactNode[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  className?: string;
};
