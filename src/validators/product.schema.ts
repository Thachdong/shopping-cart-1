import { array, number, object, string } from "zod";

export const createProductSchema = object({
  name: string().min(1),
  description: string().min(1),
  collectionIds: array(number()).optional(),
  blogpostIds: array(number()).optional(),
  variantName: string(),
  color: string(),
  size: string(),
  price: number(),
  stock: number(),
  discountPercent: number().optional(),
});
