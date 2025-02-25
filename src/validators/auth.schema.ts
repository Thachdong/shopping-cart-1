import { object, string } from "zod";

export const loginSchema = object({
  emailOrPhone: string().min(5),
  password: string().min(5),
});

export const registerSchema = object({
  username: string().min(5),
  phoneNumber: string().min(5),
  password: string().min(5),
  email: string().email().optional(),
  birthday: string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;

        return new Date(val).getTime() < new Date().getTime();
      },
      {
        message: "Birthday must be in the past",
      },
    ),
});
