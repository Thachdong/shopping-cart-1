import { joinClass } from "@/helpers/style";
import React, { useCallback, useMemo, useState } from "react";

const SUB_IMGS_CONTAINER =
  "flex flex-nowrap overflow-x-auto no-scrollbar gap-2 mt-2 px-2";

export const CardThumbnails: React.FC<Readonly<TCardThumbnails>> = ({
  thumbnails,
  className,
}) => {
  const [displayImg, setDisplayImg] = useState(thumbnails[0]);

  const subImgs = useMemo(() => {
    return thumbnails.filter((tmb) => tmb !== displayImg);
  }, [displayImg, thumbnails]);

  const renderSubImg = useCallback((img: string) => {
    return (
      <img
        onClick={() => setDisplayImg(img)}
        src={img}
        alt="card sub-thumbnails"
        className="w-1/5"
      />
    );
  }, []);

  return (
    <div className={joinClass(className)}>
      <img src={displayImg} alt="card thumbnails" />

      <div className={SUB_IMGS_CONTAINER}>{subImgs.map(renderSubImg)}</div>
    </div>
  );
};
