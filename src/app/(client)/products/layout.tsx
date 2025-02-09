import { Header } from "@/components/atoms/header";

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
      <div className="grid grid-rows-[auto_auto_1fr]">
        <Header className="mt-4 px-2" level={1}>
          Products List
        </Header>
        {searchBox}
        {children}
      </div>
    </div>
  );
}
