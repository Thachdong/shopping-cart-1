type TProductLayout = {
  children: React.ReactNode;
  filterBox: React.ReactNode;
  searchBox: React.ReactNode;
};

export default function ProductLayout({
  children,
  filterBox,
  searchBox,
}: TProductLayout) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      {filterBox}
      <div className="grid grid-rows-[auto_1fr]">
        {searchBox}
        {children}
      </div>
    </div>
  );
}
