import { joinClass } from "@/helpers/style";
import React, { useCallback, useMemo } from "react";

const DEFAULT_COLLAPSE_CLASSNAME = "ease-in-out border rounded";
const COLLAPSE_TITLE = "p-4 font-bold flex justify-between items-center cursor-pointer";
const ICON_CLASSNAME = "text-gray-400";
const CONTENT_CLASSNAME = "p-4 border-t";

export const Collapse: React.FC<Readonly<TCollapse>> = ({
  title,
  content,
  initOpen,
  className,
}) => {
  const [open, setOpen] = React.useState(initOpen);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const collapseContent = useMemo(() => {
    if (!open) return <></>;

    return <div className={CONTENT_CLASSNAME}>{content}</div>;
  }, [open, content]);

  const collapseTitle = useMemo(() => {
    const icon = open ? "▲" : "▼";

    return (
      <div
        className={joinClass(COLLAPSE_TITLE)}
        onClick={toggle}
      >
        {title}
        <span className={ICON_CLASSNAME}>{icon}</span>
      </div>
    );
  }, [title, open, toggle]);

  return (
    <div className={joinClass(DEFAULT_COLLAPSE_CLASSNAME, className)}>
      {collapseTitle}
      {collapseContent}
    </div>
  );
};
