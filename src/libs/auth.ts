import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, getServerSession as getSvSession } from "next-auth";
import { authorizeUserService } from "@/services/user-services";

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

    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      address: user.address,
      createdAt: user.createdAt,
      roles: user.roles,
    };
  },
});

export const authOptions: AuthOptions = {
  providers: [credentialsProvider],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as {
        id: number;
        createdAt: string;
        username: string;
        phoneNumber: string;
        roles: string[];
        email?: string;
        birthday?: string;
        address?: string;
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

export const getServerSession = async () => {
  return await getSvSession(authOptions);
};
