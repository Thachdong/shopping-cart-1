import { object, string } from "zod";

export const loginSchema = object({
  emailOrPhone: string().min(5),
  password: string().min(5),
});

export const registerSchema = object({
  email: string().email(),
  phone: string().min(5),
  password: string().min(5),
});
