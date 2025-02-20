import { array, object, string } from "zod";

export const createBlogpostSchema = object({
  title: string().min(1),
  description: string().min(1),
  post: string().min(1),
  publishDate: string(),
  productIds: array(string()).optional(),
  collectionIds: array(string()).optional(),
});
