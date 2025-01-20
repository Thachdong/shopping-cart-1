import { createColumnHelper } from "@tanstack/react-table";
import Table from ".";

type TUser = {
  id: number;
  name: string;
  email: string;
};

const MOCK_USERS: TUser[] = [
  { id: 1, name: "John Doe", email: "john-doe@gmail.com" },
  { id: 2, name: "Jane Doe", email: "john-doe@gmail.com" },
  { id: 3, name: "John Smith", email: "" },
  { id: 4, name: "Jane Smith", email: "" },
];

const columnHelper = createColumnHelper<TUser>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
];

export default {
  component: Table,
  title: "Table",
  args: {
    data: MOCK_USERS,
    columns,
    containerClassName: "w-1/2",
  },
};

export const Default = {}

export const Borderless = {
    args: {
        borderless: true,
    },
}