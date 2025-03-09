import React from "react";
import { SignOutButton } from "./sign-out-button";

type TUserBoxProps = {
  username: string;
};

export const UserBox: React.FC<TUserBoxProps> = ({ username }) => {
  return (
    <div className="flex gap-2 items-center">
      <span>{username}</span>
      <SignOutButton />
    </div>
  );
};
