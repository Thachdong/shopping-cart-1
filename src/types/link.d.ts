import { LinkProps } from "next/link";

type TLinkProps = LinkProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {
    type?: "internal" | "external";
  };
