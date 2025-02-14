import { array, number, object, string } from "zod";

export const createProductSchema = object({
  name: string().min(1),
  description: string().min(1),
  displayImageId: number().min(0),
  collectionIds: array(string()),
  blogpostIds: array(string()),
});
