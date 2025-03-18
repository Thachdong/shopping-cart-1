"use client";
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { TTableProps } from "@/types/table";
import { joinClass } from "@/helpers/style";
import style from "./table.module.scss";

const Table = <T extends RowData>({
  data,
  columns,
  containerClassName,
  tableclassName,
  theadClassName,
  tbodyClassName,
  tfootClassName,
  showFooter,
  borderless,
}: TTableProps<T>) => {
  const reactTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableHead = useMemo(() => {
    const headerGroups = reactTable.getHeaderGroups();

    if (headerGroups.length === 0) return <></>;

    return headerGroups.map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ));
  }, [reactTable]);

  const tableBody = useMemo(() => {
    const rows = reactTable.getRowModel().rows;

    if (rows.length === 0)
      return (
        <tr>
          <td colSpan={999} className="text-center text-sm italic">
            No data
          </td>
        </tr>
      );

    return rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ));
  }, [reactTable]);

  const tableFooter = useMemo(() => {
    const footerGroups = reactTable.getFooterGroups();

    return footerGroups.map((footerGroup) => (
      <tr key={footerGroup.id}>
        {footerGroup.headers.map((header) => (
          <th key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.footer, header.getContext())}
          </th>
        ))}
      </tr>
    ));
  }, [reactTable]);

  return (
    <div
      className={joinClass(
        containerClassName,
        !borderless ? style["table-border"] : "",
      )}
    >
      <table className={joinClass(tableclassName, "w-full")}>
        <thead className={joinClass(theadClassName)}>{tableHead}</thead>

        <tbody className={joinClass(tbodyClassName)}>{tableBody}</tbody>

        {showFooter && (
          <tfoot className={joinClass(tfootClassName)}>{tableFooter}</tfoot>
        )}
      </table>
    </div>
  );
};

export default Table;
