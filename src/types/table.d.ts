import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

type TTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  showFooter?: boolean;
  borderless?: boolean;
  containerClassName?: string;
  tableclassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  tfootClassName?: string;
};

type TDetailTableRow = {
  id: string;
  header: ReactNode;
  content: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
};

type TDetailTable = {
  rows: TDetailTableRow[];
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
};
