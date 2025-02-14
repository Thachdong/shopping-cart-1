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
    { id: "1", header: "Name", content: MOCK_COLLECTION.name },
    { id: "2", header: "Description", content: MOCK_COLLECTION.description },
    { id: "3", header: "Created At", content: MOCK_COLLECTION.createdAt },
    { id: "4", header: "Banner", content: "MOCK_COLLECTION.banner" },
  ];
  return (
    <div>
      <Header level={1}>Collection Detail</Header>

      {/* Infomations: name, description, banner */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          I. Generals
        </Header>
        <Button variant={EButtonType.outline}>Edit</Button>
      </div>

      <DetailTable rows={rows} headerClassName="!w-20" />

      {/* Products */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          II. Products
        </Header>
        <Button variant={EButtonType.outline}>Add Products</Button>
      </div>

      {/* Blog posts */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          III. Blog posts
        </Header>
        <Button variant={EButtonType.outline}>Add Posts</Button>
      </div>
    </div>
  );
};
