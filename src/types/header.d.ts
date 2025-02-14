type THeader = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  level: number;
};

type TAdminPageHeader = {
  header: React.ReactNode;
  pathName?: string;
  buttonText?: string;
};
