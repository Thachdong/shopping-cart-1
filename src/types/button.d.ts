type TButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type?: "normal" | "primary" | "secondary" | "tertiary";
};
