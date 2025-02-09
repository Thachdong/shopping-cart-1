import { Header } from "@/components/atoms/header";

type TCollectionLayout = {
  children: React.ReactNode;
  searchBox: React.ReactNode;
};

export default function CollectionLayout({
  children,
  searchBox,
}: TCollectionLayout) {
  return (
    <div className="grid grid-rows-[auto_auto_1fr]">
      <Header className="mt-4" level={1}>
        Blog Posts List
      </Header>

      {searchBox}

      {children}
    </div>
  );
}
