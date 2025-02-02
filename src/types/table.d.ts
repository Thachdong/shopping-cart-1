import { ColumnDef } from "@tanstack/react-table";

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
