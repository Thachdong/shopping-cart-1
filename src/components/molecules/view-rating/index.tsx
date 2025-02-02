import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";

const DEFAULT_STAR_CONTAINER_CLASSNAME = "flex items-center bg-white w-min";

export const WiewRating: React.FC<TViewRating> = ({ rating, className }) => {
  return (
    <div className={joinClass(DEFAULT_STAR_CONTAINER_CLASSNAME, className)}>
      <Icon fill={rating >= 1 ? "red" : ""} name={EIconName["star-outline"]} />
      <Icon fill={rating >= 2 ? "red" : ""} name={EIconName["star-outline"]} />
      <Icon fill={rating >= 3 ? "red" : ""} name={EIconName["star-outline"]} />
      <Icon fill={rating >= 4 ? "red" : ""} name={EIconName["star-outline"]} />
      <Icon fill={rating >= 5 ? "red" : ""} name={EIconName["star-outline"]} />
    </div>
  );
};
