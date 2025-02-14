import { array, object, string } from "zod";

export const createBlogpostSchema = object({
  title: string().min(1),
  description: string().min(1),
  content: string().min(1),
  publishDate: string(),
  productIds: array(string()),
  collectionIds: array(string()),
});
