import { joinClass } from "@/helpers/style";
import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const DEFAULT_STYLE = "h-9 px-2 border rounded"

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...buttonProps }) => {
  return <button className={joinClass(DEFAULT_STYLE, className)} {...buttonProps}>{children}</button>;
};
