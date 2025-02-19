import { array, number, object, string } from "zod";

export const createProductSchema = object({
  name: string().min(1),
  description: string().min(1),
  collectionIds: array(string()).optional(),
  blogpostIds: array(string()).optional(),
  variantName: string(),
  color: string(),
  size: string(),
  price: number(),
  stock: number(),
  percentOff: number().optional(),
});
