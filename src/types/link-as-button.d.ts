import { TLinkProps } from "./link";

type TLinkAsButtonProps = TLinkProps & {
  buttonProps?: Omit<TButtonProps, "children">;
};
