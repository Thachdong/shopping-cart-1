import { EIconName } from "../constants";

type TSvgIconProps = {
  name: EIconName;
  className?: string;
  iconClassName?: string;
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
};
