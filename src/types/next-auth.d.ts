// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    createdAt: string;
    username: string;
    phoneNumber: string;
    email?: string;
    birthday?: string;
    address?: string;
    roles: string[];
  }

  interface Session {
    user: User;
  }

  interface Jwt {
    user: User;
  }
}
