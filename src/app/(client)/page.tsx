import { HeroBanner } from "@/components/molecules/hero-banner";
import { ProductList } from "@/components/organisms/product-list";
import {
  bestProducts,
  MOCK_DATA,
  popularBlogposts,
  popularCollections,
} from "./data";
import { CollectionList } from "@/components/organisms/collection-list";
import { HeaderWithButton } from "@/components/molecules/header-with-button";
import { LinkAsButton } from "@/components/molecules/link-as-button";
import { EButtonType } from "@/constants";
import { BlogPostList } from "@/components/organisms/blogpost-list";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4">
      {/* herro banner */}
      <HeroBanner
        url={MOCK_DATA.herroBanner}
        header="MONI FASHION"
        description="Moni fashion description"
        height={275}
      />
      {/* most popular products -- product list */}
      <ProductList
        title="Most popular products"
        products={bestProducts}
        viewAllPath="/products"
      />

      {/* most popular collections -- collections slide */}
      <hr className="border-gray-300" />

      <HeaderWithButton
        level={2}
        button={
          <LinkAsButton
            buttonProps={{ variant: EButtonType.outline }}
            href={"/collections"}
          >
            View all
          </LinkAsButton>
        }
      >
        Most popular collections
      </HeaderWithButton>

      <CollectionList collections={popularCollections} />

      {/* most popular blogposts -- blogpost slide */}
      <hr className="border-gray-300" />

      <HeaderWithButton
        level={2}
        button={
          <LinkAsButton
            buttonProps={{ variant: EButtonType.outline }}
            href={"/posts"}
          >
            View all
          </LinkAsButton>
        }
      >
        Lastest posts
      </HeaderWithButton>

      <BlogPostList className="mb-4" blogposts={popularBlogposts} />
    </div>
  );
}
