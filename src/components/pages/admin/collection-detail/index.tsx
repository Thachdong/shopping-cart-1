import { Button } from "@/components/atoms/button";
import { Header } from "@/components/atoms/header";
import { S3Image } from "@/components/atoms/s3-image";
import { DetailTable } from "@/components/molecules/detail-table";
import { EButtonType } from "@/constants";
import { TAdminCollectionDetailProps } from "@/types/collections";
import { TDetailTableRow } from "@/types/table";
import { EditGeneralButton } from "./edit-general-button";

export const CollectionDetail: React.FC<TAdminCollectionDetailProps> = ({
  collection,
}) => {
  const rows: TDetailTableRow[] = [
    { id: "1", header: "Name", content: collection?.name },
    { id: "2", header: "Description", content: collection?.description },
    { id: "3", header: "Created At", content: collection?.createdAt },
    {
      id: "4",
      header: "Banner",
      content: collection?.banner ? (
        <S3Image
          image={collection?.banner}
          width={175}
          height={125}
          alt="collection banner"
        />
      ) : (
        ""
      ),
    },
  ];
  return (
    <div>
      <Header level={1}>Collection Detail</Header>

      {/* Infomations: name, description, banner */}
      <div className="flex items-center gap-4 mb-4">
        <Header className="!mb-0" level={4}>
          I. Generals
        </Header>
        <EditGeneralButton
          name={collection?.name || ""}
          description={collection?.description || ""}
          banner={collection?.banner || undefined}
        />
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
