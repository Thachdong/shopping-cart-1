import CredentialsProvider from "next-auth/providers/credentials";
import {
  AuthOptions,
  DefaultUser,
} from "./../../node_modules/next-auth/core/types.d";
import { authorizeUserService } from "@/services/user-services";

type TAuthUser = DefaultUser & TUser;

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

    const user = await authorizeUserService(
      credentials.username,
      credentials.password,
    );

    if (!user) {
      return null;
    }

    console.log(user, "user =====");

    return user as TAuthUser;
  },
});

export const authOptions: AuthOptions = {
  providers: [credentialsProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session({ session, user, token }) {
      console.log(session, user, token);

      return {
        ...session,
        user,
        expires:
          session.expires ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
    },
  },
};
