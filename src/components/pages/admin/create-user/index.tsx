import { Header } from "@/components/atoms/header";
import React from "react";
import { CreateUserForm } from "./create-user-form";

export const CreateUser: React.FC = () => {
  return (
    <>
      <Header level={1}>Create User</Header>

      <CreateUserForm />
    </>
  );
};
