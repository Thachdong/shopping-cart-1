import { getServerSession } from "@/libs/auth";

export async function getAuthenticatedUser() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}
