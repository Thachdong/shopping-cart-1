import { prisma } from "@/database/prisma-client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

const userRepository = prisma.user;

/**
 * Hash password
 * @param password: string
 * @returns Promise<string>
 */
export async function hashPasswordService(
  password: string,
): Promise<string | void> {
  try {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  } catch {}
}

/**
 * Compare password
 *
 * @param password: string
 * @param hashedPassword: string
 * @returns Promise<boolean>
 */
export async function comparePasswordService(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch {
    return false;
  }
}

/**
 * Create User
 *
 * @param data: username, email, password, birthday, password
 * @returns Promise<void>
 */
export async function createUserService(data: TRegister): Promise<void> {
  const { password, ...user } = data;

  const hashedPassword = await hashPasswordService(password);

  if (!hashedPassword) {
    throw new Error("Failed to hash password");
  }

  await userRepository.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
}

/**
 * Find User By Email
 *
 * @param email: string
 * @returns Promise<TUser | null>
 */
export async function findUserByEmailService(
  email: string,
): Promise<User | null> {
  return await userRepository.findFirst({
    where: {
      email,
    },
  });
}
