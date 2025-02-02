type TTag = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  content: React.ReactNode;
};

type TTagList = {
  tags: TTag[];
  className?: string;
};
