import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { joinClass } from "@/helpers/style";
import React from "react";

const DEFAULT_STAR_CONTAINER_CLASSNAME = "flex items-center bg-white w-min";

export const TakeRating: React.FC<TTakeRating> = ({
  rating,
  setRating,
  className,
}) => {
  return (
    <div className={joinClass(DEFAULT_STAR_CONTAINER_CLASSNAME, className)}>
      <Icon
        onClick={() => setRating(1)}
        fill={rating >= 1 ? "red" : ""}
        name={EIconName["star-outline"]}
      />
      <Icon
        onClick={() => setRating(2)}
        fill={rating >= 2 ? "red" : ""}
        name={EIconName["star-outline"]}
      />
      <Icon
        onClick={() => setRating(3)}
        fill={rating >= 3 ? "red" : ""}
        name={EIconName["star-outline"]}
      />
      <Icon
        onClick={() => setRating(4)}
        fill={rating >= 4 ? "red" : ""}
        name={EIconName["star-outline"]}
      />
      <Icon
        onClick={() => setRating(5)}
        fill={rating >= 5 ? "red" : ""}
        name={EIconName["star-outline"]}
      />
    </div>
  );
};
