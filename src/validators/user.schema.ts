import { number, object, string } from "zod";

export const createUserSchema = object({
  username: string().min(1),
  phoneNumber: string().min(5),
  homeNumber: string().min(1),
  ward: string().min(1),
  city: string().min(1),
  avatarId: number(),
  email: string().email(),
  birthday: string(),
});
