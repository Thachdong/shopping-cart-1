"use client";
import { Icon } from "@/components/atoms/icon";
import { EIconName } from "@/constants";
import { signOut } from "next-auth/react";
import React from "react";

export const SignOutButton: React.FC = () => {
  return (
    <Icon
      name={EIconName["sign-out"]}
      onClick={() => signOut()}
      className="cursor-pointer"
    />
  );
};
