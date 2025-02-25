"use client";
import { signOut } from "next-auth/react";
import React from "react";

export const SignOutButton: React.FC = () => {
  return <button onClick={() => signOut()}>signout</button>;
};
