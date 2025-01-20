import { useMemo } from "react";

export const useBgImage = (url: string): React.CSSProperties => {
  return useMemo(() => {
    return {
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }, [url]);
};
