import { Header } from "@/components/atoms/header";
import React from "react";
import { CreateProductForm } from "./create-product-form";

export const CreateProduct: React.FC = () => {
  return (
    <>
      <Header level={1}>Create Product</Header>

      <CreateProductForm />
    </>
  );
};
