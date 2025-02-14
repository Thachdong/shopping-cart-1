import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { DetailTable } from "@/components/molecules/detail-table";
import { EButtonType } from "@/constants";
import { TDetailTableRow } from "@/types/table";

const MOCK_COLLECTION: TAdminCollection = {
  id: 1,
  name: "Best seller",
  description: "Best sale products",
  createdAt: "2025/02/13",
};

export const CollectionDetail: React.FC = () => {
  const rows: TDetailTableRow[] = [
    { id: "1", header: "Name", contend: MOCK_COLLECTION.name },
    { id: "2", header: "Description", contend: MOCK_COLLECTION.description },
    { id: "3", header: "Created At", contend: MOCK_COLLECTION.createdAt },
    { id: "4", header: "Banner", contend: "MOCK_COLLECTION.banner" },
  ];
  return (
    <div>
      <Header level={1}>Collection Detail</Header>

      {/* Infomations: name, description, banner */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          Generals
        </Header>
        <Button variant={EButtonType.outline}>Edit</Button>
      </div>

      <DetailTable rows={rows} headerClassName="!w-20" />

      {/* Products */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          Products
        </Header>
        <Button variant={EButtonType.outline}>Add Products</Button>
      </div>

      {/* Blog posts */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          Blog posts
        </Header>
        <Button variant={EButtonType.outline}>Add Posts</Button>
      </div>
    </div>
  );
};
