import { Header } from "@/components/atoms/header";
import { joinClass } from "@/helpers/style";
import Image from "next/image";
import { LinkAsButton } from "../link-as-button";

const DEFAULT_CLASSNAME = "border rounded";
const DEFAULT_CARD_BODY = "flex flex-col gap-y-2 p-2";

export const BlogpostCard: React.FC<Readonly<TBlogpostCard>> = ({
  className,
  ...blogpost
}) => {
  return (
    <div className={joinClass(DEFAULT_CLASSNAME, className)}>
      <Image
        src={blogpost.image}
        alt={blogpost.title}
        width={125}
        height={125}
        className="w-full"
      />
      <div className={DEFAULT_CARD_BODY}>
        <Header level={3}>{blogpost.title}</Header>
        <p className="line-clamp-2">{blogpost.description}</p>
        <LinkAsButton
          href={`/blog/${blogpost.id}`}
          buttonProps={{
            variant: "outline",
          }}
        >
          Read More
        </LinkAsButton>
        <span className="text-xs italic">
          Publish Date: {blogpost.publishDate}
        </span>
      </div>
    </div>
  );
};
