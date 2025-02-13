import { number, object, string } from "zod";

export const createCollectionSchema = object({
  name: string().min(1),
  description: string().min(1),
  bannerId: number().min(1),
});
