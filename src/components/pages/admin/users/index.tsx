import { AdminPageHeader } from "@/components/molecules/admin-page-header";
import { EPath } from "@/constants";
import { genPath } from "@/helpers/router";
import React from "react";
import { UsersTable } from "./users-table";

const MOCK_USERS: TUser[] = [];

for (let i = 1; i <= 15; i++) {
  MOCK_USERS.push({
    id: i,
    createdAt: new Date().toISOString(),
    username: `user${i}`,
    phoneNumber: `123-456-789${i}`,
    email: `user${i}@example.com`,
    birthday: `1990-01-${i.toString().padStart(2, "0")}`,
    address: `Address ${i}`,
  });
}

export const UserList: React.FC = () => {
  return (
    <>
      <AdminPageHeader
        header="Users"
        pathName={genPath(EPath.adminUsers, "create")}
      />

      <UsersTable users={MOCK_USERS} />
    </>
  );
};
