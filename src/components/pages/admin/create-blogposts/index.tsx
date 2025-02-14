import { Header } from "@/components/atoms/header";
import React from "react";
import { CreateBlogpostForm } from "./create-blogpost-form";

export const CreateBlogposts: React.FC = () => {
  return (
    <>
      <Header level={1}>Create Blogpost</Header>

      <CreateBlogpostForm />
    </>
  );
};
