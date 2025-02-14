import { joinClass } from "@/helpers/style";
import { TDetailTable } from "@/types/table";
import React from "react";
import styles from "@/components/molecules/table/table.module.scss";

export const DetailTable: React.FC<TDetailTable> = ({
  rows,
  className,
  headerClassName,
  contentClassName,
}) => {
  return (
    <table
      className={joinClass(styles["table-border"], "w-full mb-4", className)}
    >
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td
              className={joinClass(
                "w-20 bg-gray-200 font-bold",
                headerClassName,
                r.headerClassName,
              )}
            >
              {r.header}
            </td>
            <td className={joinClass(contentClassName, r.contentClassName)}>
              {r.contend}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
