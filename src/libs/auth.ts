import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "./../../node_modules/next-auth/core/types.d";
import { prisma } from "@/database/prisma-client";

const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  type: "credentials",
  id: "credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    if (!credentials?.password || !credentials?.username) {
      throw new Error("Missing credentials");
    }

    return null;
  },
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [credentialsProvider],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    signIn: "/auth/login",
  },
};
