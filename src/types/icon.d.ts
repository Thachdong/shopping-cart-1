enum EIconName {
  edit = "edit",
  "square-plus" = "square-plus",
}

type TSvgIconProps = {
  name: EIconName;
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
};
